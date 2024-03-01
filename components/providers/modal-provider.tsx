"use client";
import React, { useEffect, useState } from "react";
import SetupServerModal from "../shared/modals/setup-server-modal";
SetupServerModal;
const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <SetupServerModal />
    </>
  );
};

export default ModalProvider;
