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
          className="absolute bottom-8 right-8 z-5 text-left flex flex-col bg-violet-900 p-5 rounded-full text-slate-300 outline-none hover:ring-1 hover:ring-violet-900 focus-visible:ring-2 focus-visible:ring-violet-900"
        >
          <Plus />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content asChild>
          <div className="z-10 fixed flex-1 w-full md:max-w-[640px] md:h-[60vh] bg-slate-200 md:rounded-md flex flex-col overflow-hidden inset-0 md-inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Dialog.Close asChild>
              <button className="absolute right-0 top-0 bg-slate-300 p-1.5 hover:text-slate-500 outline-none">
                <X className="size-5" />
              </button>
            </Dialog.Close>

            <form onSubmit={handleCreateNote} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-8 p-5">
                <span className="text-base font-extrabold">Adicionar nota</span>
                <textarea
                  autoFocus
                  className="text-base leading-6 text-slate-600 bg-transparent resize-none flex-1 outline-none placeholder:text-slate-600"
                  placeholder="Digite ou fale o que deseja anotar..."
                  {...register("textContent")}
                ></textarea>
              </div>

              <div className="flex justify-center gap-2 p-4 bg-slate-300">
                <button
                  className="flex items-center justify-center gap-2 bg-violet-800 p-4 rounded-full text-slate-100 font-medium outline-none hover:bg-violet-900"
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
                  className="bg-violet-800 p-4 rounded-full text-slate-100 font-medium outline-none hover:bg-violet-900"
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
