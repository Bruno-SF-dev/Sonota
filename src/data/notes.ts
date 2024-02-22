import { INote } from "../types/note-type";
import { generateUUID } from "../utils/uuid-generate";

interface IGetAllNotes {
  search: string | null;
}

export const getAllNotes = async ({ search }: IGetAllNotes) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let notes: INote[] = [
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 01",
      content: "Nota 01",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 02",
      content: "Nota 02",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 03",
      content: "Nota 03",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 04",
      content: "Nota 04",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 05",
      content: "Nota 05",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 06",
      content: "Nota 06",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 07",
      content: "Nota 07",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 08",
      content: "Nota 08",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
    {
      id: generateUUID(),
      date: new Date(),
      title: "Título 09",
      content: "Nota 09",
    },
  ];

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
