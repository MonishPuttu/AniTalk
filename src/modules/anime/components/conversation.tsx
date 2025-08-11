"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useRef } from "react";

export function Conversation() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      // Enable audio playback after user interaction
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    },
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize audio context (required for some browsers)
      const audioContext = new (window.AudioContext || window.AudioContext)();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: "agent_5701k2d0nwk2fht98vpea0q2cymz",
        connectionType: "websocket",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden audio element to handle browser audio policies */}
      <audio ref={audioRef} muted={false} />

      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? "speaking" : "listening"}</p>
      </div>

      {/* Audio troubleshooting info */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Audio Troubleshooting:</h3>
        <ul className="text-sm space-y-1">
          <li>• Make sure your speakers/headphones are connected</li>
          <li>• Check browser audio permissions</li>
          <li>• Try refreshing the page if audio doesn't work</li>
        </ul>
      </div>
    </div>
  );
}
