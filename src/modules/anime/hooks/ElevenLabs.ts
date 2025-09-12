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

  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(conversation.isSpeaking);
    }
  }, [conversation.isSpeaking, onSpeakingChange]);

  const initalizeAudio = useCallback(async () => {
    try {
      console.log("Requesting microphone permission...");
      await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setAudioPermission(true);
      console.log("Microphone permission granted");

      const audioContext = new (window.AudioContext || window.AudioContext)();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
        console.log("Audio context resumed");
      }

      setIsInitialized(true);
      return true;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
      setAudioPermission(false);
      return false;
    }
  }, []);

  const startConversation = useCallback(async () => {
    try {
      if (!isInitialized) {
        const success = await initalizeAudio();
        if (!success) return false;
      }

      console.log("Starting ElevenLabs session...");
      await conversation.startSession({
        agentId,
        connectionType: "websocket",
      });

      console.log("Session started successfully");
      return true;
    } catch (error) {
      console.error("Failed to start conversation", error);
      return false;
    }
  }, [conversation, agentId, isInitialized, initalizeAudio]);

  const stopConversation = useCallback(async () => {
    console.log("stopping conversation...");
    await conversation.endSession();
  }, [conversation]);

  useEffect(() => {
    if (autoConnect && agentId) {
      startConversation();
    }
  }, [autoConnect, agentId, startConversation]);

  return {
    status: conversation.status,
    isSpeaking: conversation.isSpeaking,
    audioPermission,
    isInitialized,
    startConversation,
    stopConversation,
    initalizeAudio,
  };
}
