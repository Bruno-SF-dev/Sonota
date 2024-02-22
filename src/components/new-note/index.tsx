import * as Dialog from "@radix-ui/react-dialog";
import { Check, Mic, Plus, X } from "lucide-react";
import { useNewNote } from "./hooks/use-new-note";

export function NewNoteCard() {
  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    handleCreateNote,
    register,
  } = useNewNote();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          data-testid="trigger-new-note-modal"
          className="fixed bottom-8 right-8 md:right-[264px] z-5 text-left flex flex-col bg-[#10C49F] p-5 rounded-full text-neutral-900 outline-none hover:ring-1 hover:ring-[#10C49F] focus-visible:ring-2 focus-visible:ring-[#10C49F]"
        >
          <Plus />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60 backdrop-blur-[4px]" />
        <Dialog.Content asChild>
          <div className="z-10 fixed flex-1 w-full md:max-w-[640px] md:h-[60vh] bg-neutral-900 md:rounded-md flex flex-col overflow-hidden inset-0 md-inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Dialog.Close asChild>
              <button className="absolute right-0 top-0  bg-neutral-800 p-1.5 hover:text-slate-400 outline-none">
                <X className="size-5" />
              </button>
            </Dialog.Close>

            <form onSubmit={handleCreateNote} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-8 p-5">
                <span className="text-base font-extrabold text-slate-300">
                  Adicionar nota
                </span>

                <input
                  autoFocus
                  placeholder="Título da nota..."
                  className="text-lg font-bold leading-6 text-slate-200 bg-transparent placeholder:text-slate-300/40 p-3 border border-neutral-800 rounded-md focus:outline-none focus:ring focus:ring-neutral-600"
                  {...register("title")}
                />

                <textarea
                  className="text-base leading-6 text-slate-200 bg-transparent resize-none flex-1 placeholder:text-slate-300/40 p-3 border border-neutral-800 rounded-md focus:outline-none focus:ring focus:ring-neutral-600"
                  placeholder="Digite ou fale o que deseja anotar..."
                  {...register("textContent")}
                ></textarea>
              </div>

              <div className="flex justify-center gap-2 p-4 bg-black">
                <button
                  className="flex items-center justify-center gap-2 bg-[#10C49F] p-4 rounded-full text-neutral-900 font-medium outline-none hover:bg-[#10C49F]"
                  type="button"
                  onClick={
                    isRecording ? handleStopRecording : handleStartRecording
                  }
                >
                  {isRecording ? (
                    <>
                      <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                      Gravando! (clique p/ interromper)
                    </>
                  ) : (
                    <Mic />
                  )}
                </button>
                <button
                  className="bg-[#10C49F] p-4 rounded-full text-neutral-900 font-medium outline-none hover:bg-[#10C49F]"
                  type="submit"
                >
                  <Check />
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
