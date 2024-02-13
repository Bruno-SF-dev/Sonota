import { ChangeEvent, useMemo, useState } from "react";
import logo from "./assets/logo-nlw-experts.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  const [search, setSearch] = useState("");

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesUpdated = [newNote, ...notes];

    setNotes(notesUpdated);

    localStorage.setItem("notes", JSON.stringify(notesUpdated));
  };

  const onNoteDeleted = (id: string) => {
    const notesUpdated = notes.filter((note) => note.id !== id);

    setNotes(notesUpdated);

    localStorage.setItem("notes", JSON.stringify(notesUpdated));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setSearch(query);
  };

  const filteredNotes = useMemo(() => {
    return search !== ""
      ? notes.filter((notes) =>
          notes.content.toLocaleLowerCase().includes(search.toLowerCase())
        )
      : notes;
  }, [search, notes]);

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-12">
      <img src={logo} alt="NLW Experts" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-custom-notes gridcols gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard note={note} key={note.id} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  );
}
