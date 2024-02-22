import { NoteList } from "../components/note-list";
import { NoteSearch } from "../components/note-search";
import logo from "./../assets/sonota.svg";

export const Notes = () => {
  return (
    <div className="space-y-14">
      <div className="flex items-center justify-center py-2 bg-black">
        <img src={logo} alt="NLW Experts" className="h-8" />
      </div>

      <div className="flex flex-1 flex-col mx-auto max-w-6xl pb-16 space-y-14 px-8 xl:px-0 min-h-[100vh]">
        <NoteSearch />

        <NoteList />
      </div>
    </div>
  );
};
