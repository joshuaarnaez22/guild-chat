"use client";
import React from "react";
import { useSocket } from "../providers/socket-provider";
import { Badge } from "@/components/ui/badge";
const SocketStatus = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className=" bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1sec
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className=" bg-emerald-600 text-white border-none">
      Live: Real-time updates
    </Badge>
  );
};

export default SocketStatus;
