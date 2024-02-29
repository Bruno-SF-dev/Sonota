import * as Dialog from "@radix-ui/react-dialog";
import { formatDate } from "date-fns/format";
import { Trash, X } from "lucide-react";
import { useNoteActions } from "../../hooks/notes-hook/use-note-actions";
import { INote } from "../../types/note-type";

interface INoteCardProps {
  note: INote;
}

export function NoteCard({
  note: { id, date, title, content },
}: INoteCardProps) {
  const { handleDeleteNote } = useNoteActions();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          data-testid="trigger-view-note-modal"
          className="rounded-md text-left flex flex-col bg-neutral-950/100 outline-none focus-visible:ring-2 focus-visible:ring-green-default transition hover:scale-105"
        >
          <div className="flex flex-1 flex-col gap-3 w-full px-5 pt-3 overflow-hidden relative">
            <span
              data-testid="note-card-date"
              className="text-xs font-medium text-slate-300/50 ml-auto"
            >
              {formatDate(date, "dd/MM/yyyy")}
            </span>

            <p
              data-testid={`note-card-content-${id}`}
              className="text-sm leading-6 text-slate-200"
            >
              {content}
            </p>

            <div className="absolute left-0 right-0 bottom-0 flex items-center h-1/4 bg-gradient-to-t from-neutral-950/90 to-black/0" />
          </div>

          <div
            data-testid={`note-card-title-${id}`}
            className="w-full flex items-center min-h-12 py-2 px-5 bg-black pointer-events-none"
          >
            <p className="text-lg text-slate-300 font-semibold truncate">
              {title}
            </p>
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60 backdrop-blur-[4px]" />
        <Dialog.Content asChild>
          <div className="z-10 fixed flex-1 w-full md:max-w-[640px] md:h-[60vh] bg-neutral-950 md:rounded-md flex flex-col overflow-hidden inset-0 md-inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Dialog.Close asChild>
              <button
                data-testid="close-view-note-modal"
                className="absolute right-0 top-0 bg-neutral-800 p-1.5 hover:text-slate-400 outline-none"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>

            <div className="flex flex-1 flex-col gap-8 p-5">
              <span
                data-testid="note-modal-date"
                className="text-base font-extrabold text-slate-300"
              >
                {formatDate(date, "dd/MM/yyyy")}
              </span>

              <span
                data-testid={`note-modal-title-${id}`}
                className="text-lg font-semibold text-slate-300"
              >
                {title}
              </span>

              <p
                data-testid={`note-modal-content-${id}`}
                className="text-base leading-6 text-slate-200"
              >
                {content}
              </p>
            </div>

            <div className="flex justify-center gap-2 p-4 bg-black/40">
              <button
                onClick={() => handleDeleteNote(id)}
                aria-label="Apagar nota"
                data-testid="submit-delete"
                className="bg-neutral-800 p-4 rounded-full text-neutral-200 font-medium outline-none transition hover:brightness-90"
              >
                <Trash />
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
