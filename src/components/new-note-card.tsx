import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [noteContent, setNoteContent] = useState("");

  const handleToggleEditor = () => {
    setShouldShowOnboarding((prev) => !prev);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    toast.success("Nota criada com sucesso!");

    setNoteContent("");
  }

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
          <div className="z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60vh] px-12 flex flex-col items-center">
            <div className="relative flex-1 w-full max-w-[640px] bg-slate-700 rounded-md flex flex-col overflow-hidden">
              <Dialog.Close asChild>
                <button
                  onClick={handleToggleEditor}
                  className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none"
                >
                  <X className="size-5" />
                </button>
              </Dialog.Close>

              <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-sm font-extrabold text-slate-300">
                    Adicionar nota
                  </span>

                  {shouldShowOnboarding ? (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece{" "}
                      <button className="font-medium text-lime-400 hover:underline">
                        gravando uma nota
                      </button>{" "}
                      em áudio ou se preferir{" "}
                      <button
                        className="font-medium text-lime-400 hover:underline"
                        onClick={handleToggleEditor}
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

                <button
                  type="submit"
                  className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium outline-none group hover:bg-lime-500"
                >
                  Salvar nota
                </button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
