import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

export function NoteCard({ note: { content, date } }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
          </span>
          <p className="text-sm leading-6 text-slate-400">{content}</p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content asChild>
          <div className="z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60vh] px-12 flex flex-col items-center">
            <div className="relative flex-1 w-full max-w-[640px] bg-slate-700 rounded-md flex flex-col overflow-hidden">
              <Dialog.Close asChild>
                <button className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none">
                  <X className="size-5" />
                </button>
              </Dialog.Close>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-extrabold text-slate-300">
                  {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
                </span>

                <p className="text-sm leading-6 text-slate-400">{content}</p>
              </div>

              <button
                type="button"
                className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 font-medium outline-none group"
              >
                Deseja{" "}
                <span className="text-red-400 group-hover:underline">
                  apagar esta nota
                </span>
                ?
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
