"use client";
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
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useTransition } from "react";
import { updateServer } from "@/actions/server";
import toast from "react-hot-toast";
import { useModal } from "@/store/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Image url is required",
  }),
});

const ServerSettings = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "editServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (!server) return;
        await updateServer(values, server.id);
        toast.success("Server created");
        form.reset();
        onClose();
      } catch (error: any) {
        console.log(error.message);
      }
    });
  };
  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form, data]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. Dont worry
            you can change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server image
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter server name"
                        {...field}
                        disabled={isPending}
                        className=" bg-zinc-300/50 border-0  text-black focus-visible:ring-offset-1 focus-visible:ring-offset-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 py-4 px-6">
              <Button
                variant="primary"
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettings;
