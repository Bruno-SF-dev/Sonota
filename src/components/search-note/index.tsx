import { Search } from "lucide-react";
import { useSearchNote } from "./hooks/use-search-note";

export const NoteSearch = () => {
  const { handleSearchNote, register } = useSearchNote();

  return (
    <div className="flex items-center max-w-6xl justify-end gap-4">
      <form
        onSubmit={handleSearchNote}
        className="w-full max-w-md flex rounded-md overflow-hidden"
      >
        <div className="w-full flex">
          <label htmlFor="searchText"></label>
          <input
            data-testid="search-note-field"
            className="w-full bg-neutral-950/80 py-2 px-4 text-base tracking-tight placeholder:text-slate-200/40 outline-none"
            placeholder="Busque suas notas..."
            {...register("search")}
            id="searchText"
          />
        </div>
        <button
          data-testid="submit-search-note"
          className="height-full px-6 flex items-center gap-4 bg-black whitespace-nowrap font-semibold text-xl text-neutral-500 focus-visible:outline outline-2 outline-offset-[-2px] outline-green-default"
        >
          <Search />
        </button>
      </form>
    </div>
  );
};
