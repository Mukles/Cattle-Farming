import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AcceptImages, MAXSIZE } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload } from "lucide-react";
import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface ProfileImageUploadProps {
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
  field: any;
}

export function ProfileImageUpload({
  previewImage,
  setPreviewImage,
  field,
}: ProfileImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImage(reader.result as string);
            field.onChange(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [field, setPreviewImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: AcceptImages,
    maxSize: MAXSIZE,
    onDrop,
  });

  return (
    <FormItem className="col-span-full">
      <FormLabel>Profile Image</FormLabel>
      <FormControl>
        <div
          {...getRootProps()}
          className={cn(
            "mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary"
          )}
        >
          <div className="text-center">
            <input {...getInputProps()} />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <ImageIcon
                className="mx-auto h-12 w-12 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <div className="mt-4 flex items-center justify-center text-sm leading-6 text-muted-foreground">
              <Upload className="mr-2 h-4 w-4" />
              <span>
                {isDragActive
                  ? "Drop the image here"
                  : "Drop an image or click to upload"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              PNG, JPG up to {Math.floor(MAXSIZE / (1024 * 1024))}MB
            </p>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
