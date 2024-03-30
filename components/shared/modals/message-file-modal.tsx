"use client";
import { useEffect, useState, useTransition } from "react";
import FileUpload from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createServer } from "@/actions/server";
import toast from "react-hot-toast";
import { useModal } from "@/store/use-modal-store";
import qs from "query-string";
import axios from "axios";
const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "File url is required",
  }),
});

const MessageFileModal = () => {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "messageFile";
  const { apiUrl, query } = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const url = qs.stringifyUrl({
          url: apiUrl || "",
          query,
        });
        axios.post(url, {
          ...values,
          content: values.fileUrl,
        });
        onClose();
      } catch (error: any) {
        console.log(error.message);
      }
    });
  };
  const handleClose = () => {
    form.setValue("fileUrl", "");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server image
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="bg-gray-100 py-4 px-6">
              <Button
                variant="primary"
                type="submit"
                disabled={isPending}
                className="px-4"
              >
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
