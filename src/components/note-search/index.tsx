import { Search } from "lucide-react";
import { useNoteSearch } from "./hooks/use-note-search";

export const NoteSearch = () => {
  const { handleFilter, register } = useNoteSearch();

  return (
    <div className="flex items-center max-w-6xl justify-end gap-4">
      <form
        onSubmit={handleFilter}
        className="w-full max-w-md flex border border-neutral-800 rounded-md overflow-hidden"
      >
        <div className="w-full flex">
          <label htmlFor="searchText"></label>
          <input
            className="w-full bg-transparent py-2 px-4 text-lg font-medium tracking-tight placeholder:text-slate-500 outline-none"
            placeholder="Busque suas notas..."
            {...register("search")}
            id="searchText"
          />
        </div>
        <button className="height-full px-6 flex items-center gap-4 bg-black whitespace-nowrap font-semibold text-xl text-[#10C49F] focus-visible:outline outline-2 outline-offset-[-2px] outline-[#10C49F]">
          <Search />
        </button>
      </form>
    </div>
  );
};
