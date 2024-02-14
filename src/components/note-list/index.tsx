import { NewNoteCard } from "../new-note";
import { NoteCard } from "../note-card";
import { useNoteList } from "./use-note-list";

export const NoteList = () => {
  const { notes, isLoading } = useNoteList();

  const renderNotes = () => {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {!!notes?.length ? (
          notes?.map((note) => <NoteCard note={note} key={note.id} />)
        ) : (
          <div className="flex items-center justify-center bg-slate-300/25 rounded-2xl">
            <p className="text-2xl text-violet-500">
              Crie suas anotações clicando ali no +
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {!!isLoading ? (
        <div className="flex flex-1 justify-center pt-[264px]">
          <div className="border-4 border-l-transparent  border-violet-400 border-solid size-12 rounded-full animate-spin duration-100"></div>
        </div>
      ) : (
        renderNotes()
      )}
      <NewNoteCard />
    </>
  );
};
