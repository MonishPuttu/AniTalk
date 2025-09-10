"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  agentId: string;
  autoConnect?: boolean;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

export function ElevenLabsConversation({
  agentId,
  autoConnect = false,
  onSpeakingChange,
}: Props) {
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("connected - Audio should start playing");
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onMessage: (message) => {
      console.log("message received:", message);
    },
    onError: (error) => {
      console.log("Conversation Error:", error);
    },
  });
}
