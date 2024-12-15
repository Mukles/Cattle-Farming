import { auth } from "@/auth";
import TagForm from "./_components/tag-form";

export default async function Add() {
  const { user } = (await auth()) || {};
  return <TagForm user={user!} />;
}
