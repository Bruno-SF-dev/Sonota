import { NoteList } from "../components/note-list";
import { NoteSearch } from "../components/note-search";

export const Notes = () => {
  return (
    <div className="flex flex-col mx-auto max-w-6xl pt-16 space-y-16 px-8 xl:px-0 h-[100vh] relative">
      <NoteSearch />
      <NoteList />
    </div>
  );
};
