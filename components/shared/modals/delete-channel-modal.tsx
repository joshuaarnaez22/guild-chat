"use client";
import { deleteChannel } from "@/actions/channel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/store/use-modal-store";
import { useTransition } from "react";
import toast from "react-hot-toast";

const DeleteChannelModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();

  const { channel } = data;
  const isModalOpen = isOpen && type === "deleteChannel";

  const confirm = () => {
    startTransition(async () => {
      try {
        if (!channel) return;
        await deleteChannel(channel.id);
        toast.success("Channel deleted");
        onClose();
      } catch (error: any) {
        console.log(error.message);
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Delete channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className=" text-indigo-500 font-bold">
              {channel?.name} will be permanently deleted
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 py-4 px-6">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="mr-auto"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={isPending}
            type="submit"
            onClick={confirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
