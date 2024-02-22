import { NoteList } from "../components/note-list";
import { NoteSearch } from "../components/note-search";

export const Notes = () => {
  return (
    <div className="flex flex-1 flex-col space-y-14 mx-auto max-w-6xl py-32 px-8 xl:px-0 min-h-[100vh]">
      <NoteSearch />
      <NoteList />
    </div>
  );
};
