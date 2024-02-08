import logo from "./assets/logo-nlw-experts.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-12">
      <img src={logo} alt="NLW Experts" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-custom-notes gridcols gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard note={{ date: new Date(), content: "Hello World" }} />
      </div>
    </div>
  );
}
