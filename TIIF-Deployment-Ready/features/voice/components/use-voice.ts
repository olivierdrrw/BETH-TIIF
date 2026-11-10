"use client";

import { useEffect, useRef, useState } from "react";

interface UseVoiceOptions {
  onResult?: (text: string) => void;
}

export function useVoice({ onResult }: UseVoiceOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      onResult?.(transcript);
    };

    recognition.onerror = (e: any) => {
      setError(
        e.error === "not-allowed"
          ? "Microphone access was denied."
          : "Couldn't hear that — please try again."
      );
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [onResult]);

  function startListening() {
    if (!recognitionRef.current) return;
    setError(null);
    setIsListening(true);
    recognitionRef.current.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  return { isListening, isSupported, error, startListening, stopListening };
}
