"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  generatePDFText,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-utils";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File Size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      toast("Error occurred while uploading!", { description: err.message });
      console.error("error occurred while uploading", err);
    },
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Validating the fields
      // Schema with zod
      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);
      if (!validatedFields.success) {
        toast.custom(() => (
          <div className="p-6 rounded-md bg-white shadow-md">
            <p className="text-rose-600 font-semibold">
              ❌ Something went wrong
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              {validatedFields.error.flatten().fieldErrors.file?.[0] ??
                "Invalid File"}
            </p>
          </div>
        ));
        setIsLoading(false);
        return;
      }

      toast.custom(() => (
        <div className="p-6 rounded-md bg-white shadow-md">
          <p className="text-gray-900 font-semibold">📄 Uploading PDF...</p>
          <p className="text-sm text-gray-700 font-semibold">
            We are uploading your PDF!
          </p>
        </div>
      ));

      // Upload the file to Uploadthing
      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast.custom(() => (
          <div className="p-6 rounded-md bg-white shadow-md">
            <p className="text-rose-600 font-semibold">
              ❌ Something went wrong
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              Please use a different File!
            </p>
          </div>
        ));
        setIsLoading(false);
        return;
      }

      toast.custom(() => (
        <div className="p-6 rounded-md bg-white shadow-md">
          <p className="text-gray-900 font-semibold">📄 Processing PDF</p>
          <p className="text-sm text-gray-700 font-semibold">
            Hang tight! Our AI is reading through your document ✨
          </p>
        </div>
      ));

      // Parse the pdf using LangChain
      // Summarize the pdf using AI
      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      // Save the summary to the database
      let storeResult: any;
      toast.custom(() => (
        <div className="p-6 rounded-md bg-white shadow-md">
          <p className="text-gray-900 font-semibold">📄 Saving PDF....</p>
          <p className="text-sm text-gray-700 font-semibold">
            Hang tight! We are saving your summary ✨
          </p>
        </div>
      ));

      const formattedFileName = formatFileNameAsTitle(file.name);
      // Save the summary to the database
      const result = await generatePDFText({
        fileUrl: uploadFileUrl,
      });


      toast.custom(() => (
        <div className="p-6 rounded-md bg-white shadow-md">
          <p className="text-gray-900 font-semibold">📄 Generating PDF Summary</p>
          <p className="text-sm text-gray-700 font-semibold">
            Hang tight! We are Generating summary ✨
          </p>
        </div>
      ));

      // call ai service
      const summaryResult = await generatePdfSummary({
        pdfText: result?.data?.pdfText ?? "",
        fileName: formattedFileName,
      });


      toast.custom(() => (
        <div className="p-6 rounded-md bg-white shadow-md">
          <p className="text-gray-900 font-semibold">📄 Saving PDF Summary....</p>
          <p className="text-sm text-gray-700 font-semibold">
            Hang tight! We are saving your PDF summary ✨
          </p>
        </div>
      ));

      const { data = null, message = null } = summaryResult || {};

      if (data?.summary) {
        storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: formattedFileName,
          fileName: file.name,
        });

        toast.custom(() => (
          <div className="p-6 rounded-md bg-white shadow-md">
            <p className="text-gray-900 font-semibold">✨ Summary Generated!</p>
            <p className="text-sm text-gray-700 font-semibold">
              Your PDF has been successfully summarized and saved! ✨
            </p>
          </div>
        ));

        formRef.current?.reset();
        // redirect to the [id] summary page
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred.. ", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>

      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
