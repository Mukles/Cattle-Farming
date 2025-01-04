"use server";

import { prisma } from "@/lib/prisma";
import { updateTagSchema } from "@/lib/validation/tag.schema";
import { Result, safeAction } from "..";
import { Tag } from "./type";

export const createTagAction = async (
  state: Result<Tag>,
  formData: FormData
): Promise<Result<Tag>> => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = updateTagSchema.parse(data);
    const newTag = await prisma.tag.create({
      data: {
        title: validatedData.title,
        createdBy: validatedData.createdBy,
      },
    });

    return newTag;
  });
};

export const getTags = async (): Promise<Result<Tag[]>> => {
  return safeAction(async () => {
    return await prisma.tag.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  });
};
