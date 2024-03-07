"use client";
import { deleteServer, leaveServer } from "@/actions/server";
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

const LeaverServerModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const { server } = data;
  const isModalOpen = isOpen && type === "leaveServer";

  const confirm = () => {
    startTransition(async () => {
      try {
        if (!server) return;
        leaveServer(server.id);
        toast.success("You successfully leave the server");
        onClose();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Leave server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want leave?{" "}
            <span className=" text-indigo-500 font-bold">{server?.name}</span>
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

export default LeaverServerModal;
