interface IGetAllNotes {
  search: string | null;
}

export const getAllNotes = async ({ search }: IGetAllNotes) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let notes = [
    {
      id: crypto.randomUUID(),
      date: new Date(),
      content: "Nota 01",
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      content: "Nota 02",
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      content: "Nota 03",
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
  textContent: string;
}

export const createNote = async ({ textContent }: ICreateNote) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: crypto.randomUUID(),
    date: new Date(),
    content: textContent,
  };
};