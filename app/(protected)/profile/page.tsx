"use client";

import { User } from "@/app/actions/user/type";
import { Card } from "@/components/ui/card";
import { AcceptImages, MAXSIZE } from "@/lib/constant";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function Profile() {
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
  const updateUserForm = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      image: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImage(reader.result as string); // Set the preview image
          }
        };

        reader.readAsDataURL(file);
      });
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: AcceptImages,
    maxSize: MAXSIZE,
    onDrop,
  });

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Account settings</CardTitle>
        <CardDescription>
          Manage your profile, security, payment and notification settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...updateUserForm}>
          <form className="space-y-4">
            {/* Image Upload Field */}
            <FormField
              control={updateUserForm.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <>
                      <div
                        {...getRootProps()}
                        className="border-dashed border-2 px-4 text-center cursor-pointer rounded py-8"
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the image file here...</p>
                        ) : (
                          <p>
                            Drag & drop your image here, or click to select
                            files
                          </p>
                        )}
                      </div>
                      {previewImage && (
                        <div className="mt-4">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="max-w-full h-auto rounded shadow"
                          />
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name Field */}
            <FormField
              control={updateUserForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={updateUserForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={updateUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
