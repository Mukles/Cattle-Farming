"use server";

import { prisma } from "@/lib/prisma";
import { tagSchema } from "@/lib/validation/tag.schema";
import { Result, safeAction } from "..";
import { Tag } from "./type";

export const createTagAction = async (
  state: Result<Tag>,
  formData: FormData
): Promise<Result<Tag>> => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = tagSchema.parse(data);
    const newTag = await prisma.tag.create({ data: validatedData });
    return { success: true, data: newTag };
  });
};

export const getTags = async (): Promise<Result<Tag[]>> => {
  return safeAction(async () => {
    const tags = await prisma.tag.findMany();
    return { success: true, data: tags };
  });
};
