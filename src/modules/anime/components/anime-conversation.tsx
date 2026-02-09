"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimeCards } from "../constants";
import { Mic, MicOff, PhoneOff } from "lucide-react";

interface Message {
  id: string;
  source: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface Props {
  characterId: string;
}

export function AnimeConversation({ characterId }: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const character = useMemo(
    () => AnimeCards.find((c) => c.id === Number(characterId)),
    [characterId]
  );

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to", character?.title);
      setIsStarted(true);
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onMessage: (message: { source?: string; message?: string }) => {
      console.log("Message:", message);
      if (message.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            source: (message.source === "user" ? "user" : "ai") as
              | "user"
              | "ai",
            text: message.message!,
            timestamp: new Date(),
          },
        ]);
      }
    },
    onError: (error) => {
      console.error("Conversation Error:", error);
    },
  });

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start conversation on mount
  useEffect(() => {
    if (!character) return;

    const initConversation = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        setAudioStream(stream);

        const audioContext = new (window.AudioContext || window.AudioContext)();
        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        await conversation.startSession({
          agentId: character.agentId,
          connectionType: "websocket",
        });
      } catch (error) {
        console.error("Failed to start conversation:", error);
      }
    };

    initConversation();

    return () => {
      conversation.endSession();
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  const toggleMute = useCallback(() => {
    if (audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  }, [audioStream, isMuted]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    router.push("/anime");
  }, [conversation, audioStream, router]);

  if (!character) {
    return (
      <div className="flex items-center justify-center flex-1">
        <p className="text-lg text-muted-foreground">Character not found</p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Blurred backdrop - using img tag for SVG compatibility */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={typeof character.image === "string" ? character.image : (character.image as { src: string }).src}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover blur-md opacity-25 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-black/30 backdrop-blur-md">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/25 shrink-0">
            <Image
              src={character.image}
              alt={character.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white truncate">
              {character.title}
            </h2>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  conversation.status === "connected"
                    ? "bg-green-400 animate-pulse"
                    : "bg-gray-400"
                }`}
              />
              <span className="text-xs text-white/50">
                {conversation.status === "connected"
                  ? conversation.isSpeaking
                    ? "Speaking..."
                    : "Listening..."
                  : isStarted
                    ? "Reconnecting..."
                    : "Connecting..."}
              </span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 md:px-8 lg:px-16">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-white/20 shadow-2xl">
                <Image
                  src={character.image}
                  alt={character.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-white/80 font-medium text-lg">
                  {character.title}
                </p>
                <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                  {conversation.status === "connected"
                    ? "Start speaking — your conversation will appear here."
                    : "Setting up the connection..."}
                </p>
              </div>
              {conversation.status === "connected" && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:300ms]" />
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.source === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI avatar */}
                  {msg.source === "ai" && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/20 shrink-0 mb-1">
                      <Image
                        src={character.image}
                        alt={character.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                      msg.source === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white/15 text-white backdrop-blur-lg border border-white/15 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-[11px] font-semibold mb-1 opacity-60 uppercase tracking-wide">
                      {msg.source === "user" ? "You" : character.title}
                    </p>
                    <p className="text-[15px] leading-relaxed font-medium">
                      {msg.text}
                    </p>
                    <p className="text-[10px] mt-1.5 opacity-30 text-right">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="px-6 py-5 flex items-center justify-center gap-8 border-t border-white/10 bg-black/30 backdrop-blur-md">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-all duration-200 cursor-pointer ${
              isMuted
                ? "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/25"
                : "bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/20"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={endCall}
            className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all duration-200 shadow-lg shadow-red-600/40 cursor-pointer"
            title="End Call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
