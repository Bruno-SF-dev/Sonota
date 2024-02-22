import { useNoteList } from "../../hooks/notes-hook/use-note-list";
import { NewNoteCard } from "../new-note";
import { NoteCard } from "../note-card";

export const NoteList = () => {
  const { notes, isLoading } = useNoteList();

  const renderNotes = () => {
    return (
      <>
        {!!notes?.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[180px]">
            {notes?.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}

            <div className="fixed bottom-8 right-8 md:right-[264px] z-5">
              <NewNoteCard />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center rounded-2xl">
            <p className="text-2xl text-slate-300">Crie suas anotações aqui</p>

            <NewNoteCard />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {!!isLoading ? (
        <div
          data-testid="note-list-loader"
          className="flex flex-1 justify-center pt-[264px]"
        >
          <div className="border-4 border-l-transparent  border-green-default border-solid size-12 rounded-full animate-spin duration-100"></div>
        </div>
      ) : (
        renderNotes()
      )}
    </>
  );
};
