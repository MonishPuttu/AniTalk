"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useState } from "react";

export function Conversation() {
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected - Audio should start playing");
    },
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onError: (error) => {
      console.error("Conversation Error:", error);
    },
  });

  // Check audio devices on component mount
  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputs = devices.filter(
          (device) => device.kind === "audiooutput"
        );
        setAudioDevices(audioOutputs);
        console.log("Available audio output devices:", audioOutputs);
      } catch (error) {
        console.error("Error getting audio devices:", error);
      }
    };

    getAudioDevices();
  }, []);

  const testAudioOutput = useCallback(async () => {
    try {
      // Test audio playback
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 440; // A4 note
      gainNode.gain.value = 0.1;

      oscillator.start();
      setTimeout(() => oscillator.stop(), 200);

      console.log("Audio test completed - you should have heard a beep");
    } catch (error) {
      console.error("Audio test failed:", error);
    }
  }, []);

  const startConversation = useCallback(async () => {
    try {
      console.log("Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setAudioPermission(true);
      console.log("Microphone permission granted");

      // Ensure audio context is active
      const audioContext = new (window.AudioContext || window.AudioContext)();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
        console.log("Audio context resumed");
      }

      console.log("Starting ElevenLabs session...");
      await conversation.startSession({
        agentId: "agent_5701k2d0nwk2fht98vpea0q2cymz",
        connectionType: "websocket",
      });

      console.log("Session started successfully");
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setAudioPermission(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    console.log("Stopping conversation...");
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300 hover:bg-red-600"
        >
          Stop Conversation
        </button>
        <button
          onClick={testAudioOutput}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Audio
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold">Status: {conversation.status}</p>
        <p>
          Agent is {conversation.isSpeaking ? "🔊 speaking" : "👂 listening"}
        </p>
        <p>Microphone: {audioPermission ? "✅ Granted" : "❌ Not granted"}</p>
      </div>

      {/* Debug information */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-md">
        <h3 className="font-semibold mb-2">Audio Debug Info:</h3>
        <div className="text-sm space-y-1">
          <p>Audio Output Devices: {audioDevices.length}</p>
          {audioDevices.map((device, index) => (
            <p key={index} className="text-xs text-gray-600">
              • {device.label || `Device ${index + 1}`}
            </p>
          ))}
        </div>
      </div>

      {/* Troubleshooting steps */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md">
        <h3 className="font-semibold mb-2 text-yellow-800">
          If you can't hear audio:
        </h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Click "Test Audio" to verify speakers work</li>
          <li>2. Check browser audio settings (🔊 icon in address bar)</li>
          <li>3. Ensure your agent in ElevenLabs has a voice assigned</li>
          <li>4. Try using headphones instead of speakers</li>
          <li>5. Refresh the page and try again</li>
        </ol>
      </div>
    </div>
  );
}
