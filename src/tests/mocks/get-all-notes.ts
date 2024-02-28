import { IGetAllNotes } from "../../data/api";
import { INote } from "../../types/note-type";

export const mockNotes: INote[] = [
  { id: "abc-1", date: new Date(), title: "Título 1", content: "Conteúdo 1" },
  { id: "abc-2", date: new Date(), title: "Título 2", content: "Conteúdo 2" },
  { id: "abc-3", date: new Date(), title: "Título 3", content: "Conteúdo 3" },
  { id: "abc-4", date: new Date(), title: "Título 4", content: "Conteúdo 4" },
  { id: "abc-5", date: new Date(), title: "Título 5", content: "Conteúdo 5" },
];

export const mockGetAllNotes = async ({ search }: IGetAllNotes) => {
  await new Promise((resolve) => setTimeout(resolve, 0));

  let filteredNotes = [...mockNotes];

  if (search?.trim()) {
    filteredNotes = filteredNotes.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredNotes;
};
