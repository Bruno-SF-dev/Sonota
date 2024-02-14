import { Search } from "lucide-react";
import logo from "../../assets/logo-nlw-experts.svg";
import { useNoteSearch } from "./use-note-search";

export const NoteSearch = () => {
  const { handleFilter, register } = useNoteSearch();

  return (
    <div className="flex items-center justify-between gap-4">
      <img src={logo} alt="NLW Experts" />
      <form
        onSubmit={handleFilter}
        className="w-full max-w-[520px] flex border border-slate-400 rounded-md overflow-hidden"
      >
        <div className="w-full flex">
          <label htmlFor="searchText"></label>
          <input
            className="w-full bg-transparent py-2 px-4 text-lg font-semibold tracking-tight placeholder:text-slate-500 outline-none"
            placeholder="Busque suas notas..."
            {...register("search")}
            id="searchText"
          />
        </div>
        <button className="height-full px-6 flex items-center gap-4 bg-slate-300 whitespace-nowrap font-semibold border-l border-slate-400 text-xl text-violet-900 focus-visible:outline outline-2 outline-offset-[-2px] outline-violet-900">
          <Search />
        </button>
      </form>
    </div>
  );
};
