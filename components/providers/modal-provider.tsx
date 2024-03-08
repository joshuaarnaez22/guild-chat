"use client";
import React, { useEffect, useState } from "react";
import SetupServerModal from "../shared/modals/setup-server-modal";
import InviteModal from "../shared/modals/invite-modal";
import ServerSettings from "../shared/modals/server-settings-modal";
import MembersModal from "../shared/modals/members-modal";
import CreateChannelModal from "../shared/modals/create-channel-modal";
import DeleteServerModal from "../shared/modals/delete-server-modal";
import LeaverServerModal from "../shared/modals/leave-server-modal";
import EditChannel from "../shared/modals/edit-channel";
import DeleteChannelModal from "../shared/modals/delete-channel-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <SetupServerModal />
      <InviteModal />
      <ServerSettings />
      <MembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaverServerModal />
      <EditChannel />
      <DeleteChannelModal />
    </>
  );
};

export default ModalProvider;
