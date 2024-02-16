import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { X } from "lucide-react";
import { INote } from "../../types/note-type";

interface INoteCardProps {
  note: INote;
}

export function NoteCard({ note: { id, date, content } }: INoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md text-left flex flex-col bg-slate-300 p-5 gap-y-3 overflow-hidden relative outline-none hover:ring-1 hover:ring-violet-400 focus-visible:ring-2 focus-visible:ring-violet-900">
          <span
            data-testid="note-card-date"
            className="text-sm font-medium text-slate-800"
          >
            {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
          </span>
          <p
            data-testid={`note-card-content-${id}`}
            className="text-sm leading-6 text-slate-500"
          >
            {content}
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/5 to-black/0 pointer-events-none" />
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

            <div className="flex flex-1 flex-col gap-8 p-5">
              <span
                data-testid="note-modal-date"
                className="text-base font-extrabold"
              >
                {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
              </span>

              <p
                data-testid="note-modal-content"
                className="text-base leading-6 text-slate-600"
              >
                {content}
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
