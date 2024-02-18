"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon } from "lucide-react";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface LanguageImageProps {
  initialData: Course
  courseId: string;
};

const formSchema = z.object({
  language: z.string().min(1, {
    message: "Image is required",
  }),
});

export const LanguageImageForm = ({
  initialData,
  courseId
}: LanguageImageProps) => {
  
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border border-slate-100/20 shadow-md bg-[#1e1e1e] bg-opacity-95 rounded-xl p-4">
      <div className="font-semibold flex items-center justify-between text-xl">
        Language Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <AutoFixNormalIcon className="text-slate-200" />
              
            </>
          )}
         
        </Button>
      </div>
      {!isEditing && (
        !initialData.language ? (
          <div className="flex items-center justify-center h-60 mt-4 bg-slate-200 rounded">
            <ImageIcon className="h-10 w-10 text-[#1e1e1e]" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.language}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ language: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}