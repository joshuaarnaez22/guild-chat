"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  onChange: (url?: string) => void;
  value: string;
}
const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} className="rounded-full" alt="Upload" fill />
        <button
          onClick={() => onChange("")}
          className=" absolute top-0 right-0 bg-rose-500 rounded-full p-1 shadow-sm text-white"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error.message);
        }}
      />
    </div>
  );
};

export default FileUpload;
