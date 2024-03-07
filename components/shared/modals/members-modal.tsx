"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/store/use-modal-store";
import { ServerWithMembersWithChannels } from "@/type";
import { DialogDescription } from "@radix-ui/react-dialog";
import UserAvatar from "../user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState, useTransition } from "react";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { kickMemberfromServer, updateMemberRole } from "@/actions/member";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState("");
  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersWithChannels };

  const onRoleChange = (role: string, memberId: string) => {
    startTransition(async () => {
      try {
        if (!server) return;
        const serverData = await updateMemberRole(role, memberId, server.id);
        onOpen("members", { server: serverData });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingId("");
      }
    });
  };

  const onKickMember = (memberId: string) => {
    startTransition(async () => {
      try {
        if (!server) return;
        const serverData = await kickMemberfromServer(memberId, server.id);
        onOpen("members", { server: serverData });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingId("");
      }
    });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-sm font-bold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className=" text-xs text-zinc-500">{member.profile.email}</p>
              </div>

              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500 focus:outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setLoadingId(member.id);
                                  onRoleChange("GUEST", member.id);
                                }}
                              >
                                <ShieldQuestion className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setLoadingId(member.id);
                                  onRoleChange("MODERATOR", member.id);
                                }}
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setLoadingId(member.id);
                            onKickMember(member.id);
                          }}
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className=" text-zinc-500 h-4 w-5 animate-spin ml-auto" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
