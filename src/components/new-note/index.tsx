import * as Dialog from "@radix-ui/react-dialog";
import { Check, Mic, Plus, X } from "lucide-react";
import { useNewNote } from "./hooks/use-new-note";

export function NewNote() {
  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    handleCreateNote,
    register,
    errors,
    onClearModalState,
    modalIsOpen,
    setModalIsOpen,
  } = useNewNote();

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Criar nota"
          className="bg-green-default p-5 rounded-full text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-slate-200 transition hover:scale-105"
        >
          <Plus />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/70 backdrop-blur-[4px]" />
        <Dialog.Content asChild>
          <div
            data-testid="new-note-modal"
            className="z-10 fixed flex-1 w-full md:max-w-[640px] md:h-[60vh] bg-neutral-950 md:rounded-md flex flex-col overflow-hidden inset-0 md-inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <Dialog.Close asChild onClick={onClearModalState}>
              <button
                data-testid="close-new-note-modal"
                className="absolute right-0 top-0  bg-neutral-800 p-1.5 hover:text-slate-400 outline-none"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>

            <form onSubmit={handleCreateNote} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-8 p-5">
                <span className="text-base font-extrabold text-slate-300">
                  Adicionar nota
                </span>

                <div className="space-y-1">
                  <input
                    data-testid="title-field"
                    autoFocus
                    placeholder="Título da nota..."
                    className="w-full text-lg font-bold leading-6 text-slate-200 bg-transparent placeholder:text-slate-300/40 p-3 border border-neutral-800 rounded-md focus:outline-none focus:ring focus:ring-neutral-600"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1 flex flex-col flex-1">
                  <textarea
                    data-testid="content-field"
                    className="w-full h-full text-base leading-6 text-slate-200 bg-transparent resize-none flex-1 placeholder:text-slate-300/40 p-3 border border-neutral-800 rounded-md focus:outline-none focus:ring focus:ring-neutral-600"
                    placeholder="Digite o que deseja anotar..."
                    {...register("textContent")}
                  ></textarea>
                  {errors.textContent && (
                    <p className="text-sm text-red-600">
                      {errors.textContent.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-2 p-4 bg-black/40">
                <button
                  className="flex items-center justify-center gap-2 bg-green-default p-4 rounded-full text-neutral-900 font-medium outline-none transition hover:brightness-90"
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
                  aria-label="Salvar nota"
                  data-testid="submit-create"
                  className="bg-green-default p-4 rounded-full text-neutral-900 font-medium outline-none transition hover:brightness-90"
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
