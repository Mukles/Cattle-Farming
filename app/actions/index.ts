"use server";

import { Prisma } from "@prisma/client";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import "server-only";
import { z } from "zod";

export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export type ErrorType =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNIQUE_CONSTRAINT"
  | "FOREIGN_KEY_CONSTRAINT"
  | "SERVER_ERROR"
  | "AUTH_ERROR";

export type Result<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: {
        type: ErrorType;
        message: string;
        details?: Record<string, any>;
      } | null;
    }
  | null;

function formatZodErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([field, messages]) => [
      field,
      messages?.[0] || "Invalid input",
    ])
  );
}

export async function safeAction<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const response = await fn();
    return {
      data: response,
      success: true,
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      redirect("/");
    }
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          type: "VALIDATION_ERROR",
          message: "Invalid user data",
          details: formatZodErrors(error),
        },
      };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": // Unique constraint violation
          return {
            success: false,
            error: {
              type: "UNIQUE_CONSTRAINT",
              message: "A record with this unique identifier already exists",
              details: { field: error.meta?.target },
            },
          };
        case "P2003": // Foreign key constraint violation
          return {
            success: false,
            error: {
              type: "FOREIGN_KEY_CONSTRAINT",
              message: "Related record not found",
              details: { field: error.meta?.field_name },
            },
          };
        case "P2025": // Record not found
          return {
            success: false,
            error: {
              type: "NOT_FOUND",
              message: "Record not found",
              details: error.meta,
            },
          };
      }
    }

    if (error instanceof CredentialsSignin) {
      return {
        success: false,
        error: {
          type: "AUTH_ERROR",
          message: error.message.substring(
            0,
            error.message.indexOf(". Read more")
          ),
          details: {
            originalError: "Unknown error occurred",
          },
        },
      };
    }

    if (error instanceof Error) {
      console.log(error);
      return {
        error: {
          type: "SERVER_ERROR",
          message: error.message,
          details: {
            originalError: error.stack,
          },
        },
        success: false,
      };
    }

    return {
      success: false,
      error: {
        type: "SERVER_ERROR",
        message: "Unexpected database error",
        details: {
          originalError: "Unknown error occurred",
        },
      },
    };
  }
}
