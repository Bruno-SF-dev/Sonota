import { NoteList } from "../../components/note-list";
import { NoteSearch } from "../../components/search-note";

export const Notes = () => {
  return (
    <div className="flex flex-1 flex-col space-y-20 mx-auto max-w-6xl pt-8 md:pt-24 pb-44 px-8 xl:px-0 min-h-[100vh]">
      <NoteSearch />
      <NoteList />
    </div>
  );
};
