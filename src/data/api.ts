import { generateUUID } from "../utils/uuid-generate";
import { allNotes } from "./all-notes";
export interface IGetAllNotes {
  search: string | null;
}

export const getAllNotes = async ({ search }: IGetAllNotes) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let notes = [...allNotes];

  if (search?.trim()) {
    notes = notes.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  return notes;
};

export interface ICreateNote {
  title: string;
  textContent: string;
}

export const createNote = async ({ textContent, title }: ICreateNote) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: generateUUID(),
    date: new Date(),
    title,
    content: textContent,
  };
};

export const deleteNote = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return allNotes.filter((note) => note.id !== id);
};
