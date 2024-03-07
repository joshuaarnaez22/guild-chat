"use client";
import { updateInviteLink } from "@/actions/server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";

import { useModal } from "@/store/use-modal-store";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const origin = useOrigin();
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const onNew = () => {
    startTransition(async () => {
      try {
        const server = await updateInviteLink(data.server?.id!);
        onOpen("invite", { server });
        toast.success("Invite url updated");
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
            Invite friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isPending}
              value={inviteUrl}
              readOnly
              className=" bg-zinc-300/50 border-0  text-black focus-visible:ring-offset-1 focus-visible:ring-offset-slate-300"
            />

            <Button size="icon" onClick={onCopy} disabled={isPending}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            className="text-xs text-zinc-500 mt-4"
            disabled={isPending}
            onClick={onNew}
          >
            Generate a new link
            {isPending ? (
              <RefreshCcw className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
