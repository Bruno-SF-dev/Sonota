import { useState } from "react";
import { toast } from "sonner";

let speechRecognition: SpeechRecognition | null = null;

export const useRecordingHook = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleStartRecording = () => {
    // A API de recomhecimento de fala está disponível no navegador?
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition";

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error("Infelizmente seu navegador não suporta gravação.");
      return;
    }

    setIsRecording(true);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (e) => {
      const transcriptionResult = Array.from(e.results).reduce(
        (text, itemResult) => {
          return text.concat(itemResult[0].transcript);
        },
        ""
      );

      setTranscription(transcriptionResult);
    };

    speechRecognition.onerror = (e) => {
      console.error(e);
    };

    speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    speechRecognition?.stop();
  };

  return {
    isRecording,
    handleStartRecording,
    handleStopRecording,
    transcription,
    setTranscription,
  };
};
