import { faker } from "@faker-js/faker";
import { INote } from "../types/note-type";

interface IGetAllNotes {
  search: string | null;
}

const allNotes: INote[] = Array.from({ length: 18 }).map(() => ({
  id: faker.string.uuid(),
  date: faker.date.anytime(),
  title: faker.lorem.words({ min: 2, max: 3 }),
  content: faker.lorem.text(),
}));

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
    id: crypto.randomUUID(),
    date: new Date(),
    title,
    content: textContent,
  };
};
