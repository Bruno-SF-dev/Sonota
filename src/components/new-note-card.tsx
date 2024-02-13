import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

let speechRecognition: SpeechRecognition | null = null;

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleOpenEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleCloseEditor = () => {
    setShouldShowOnboarding(true);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();

    if (!noteContent.trim()) {
      return;
    }

    onNoteCreated(noteContent);
    toast.success("Nota criada com sucesso!");
    setNoteContent("");
    handleCloseEditor();
  };

  const handleStartRecording = () => {
    // A API de recomhecimento de fala está disponível no navegador?
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition";

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error("Infelizmente seu navegador não suporta gravação.");
      return;
    }

    setIsRecording(true);
    handleOpenEditor();

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (e) => {
      const transcription = Array.from(e.results).reduce((text, itemResult) => {
        return text.concat(itemResult[0].transcript);
      }, "");

      setNoteContent(transcription);
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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md text-left flex flex-col bg-slate-700 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content asChild>
          <div className="z-10 fixed inset-0 md-inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:h-[60vh] md:px-12 flex flex-col items-center">
            <div className="relative flex-1 w-full md:max-w-[640px] bg-slate-700 md:rounded-md flex flex-col overflow-hidden">
              <Dialog.Close asChild>
                <button
                  onClick={handleCloseEditor}
                  className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none"
                >
                  <X className="size-5" />
                </button>
              </Dialog.Close>

              <form className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-sm font-extrabold text-slate-300">
                    Adicionar nota
                  </span>

                  {shouldShowOnboarding ? (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece{" "}
                      <button
                        className="font-medium text-lime-400 hover:underline"
                        type="button"
                        onClick={handleStartRecording}
                      >
                        gravando uma nota
                      </button>{" "}
                      em áudio ou se preferir{" "}
                      <button
                        className="font-medium text-lime-400 hover:underline"
                        type="button"
                        onClick={handleOpenEditor}
                      >
                        utilize apenas texto
                      </button>
                      .
                    </p>
                  ) : (
                    <textarea
                      autoFocus
                      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                      onChange={handleContentChange}
                      value={noteContent}
                    ></textarea>
                  )}
                </div>

                {isRecording ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 font-medium outline-none group hover:text-slate-100"
                    type="button"
                    onClick={handleStopRecording}
                  >
                    <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                    Gravando! (clique p/ interromper)
                  </button>
                ) : (
                  <button
                    className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium outline-none group hover:bg-lime-500"
                    type="button"
                    onClick={handleSaveNote}
                  >
                    Salvar nota
                  </button>
                )}
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
