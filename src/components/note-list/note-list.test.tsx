import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import { NoteList } from ".";
import * as actions from "../../data/notes";
import * as useNoteList from "../../hooks/notes-hook/use-note-list";
import { customRender } from "../../tests/custom-render";
import { INote } from "../../types/note-type";
import { generateUUID } from "../../utils/uuid-generate";

jest.mock("../../utils/uuid-generate", () => {
  return {
    generateUUID: jest.fn(),
  };
});

describe("Componente: NoteList", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("Renderizar o Loader quando isLoading true", () => {
    const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const notes: INote[] = [{ id: id1, date: new Date(), content: content1 }];

    useNoteListSpy.mockReturnValueOnce({ notes, isLoading: true });

    customRender(<NoteList />);

    const noteListLoader = screen.queryByTestId("note-list-loader");
    const noteCardContent1 = screen.queryByTestId(`note-card-content-${id1}`);

    expect(noteListLoader).toBeInTheDocument();
    expect(noteCardContent1).toBeNull();
  });

  test("Renderizar a lista quando isLoading false", () => {
    const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const id2 = faker.string.uuid();
    const content2 = faker.lorem.text();

    const notes: INote[] = [
      { id: id1, date: new Date(), content: content1 },
      { id: id2, date: new Date(), content: content2 },
    ];

    useNoteListSpy.mockReturnValueOnce({ notes, isLoading: false });

    customRender(<NoteList />);

    const note1CardContent = screen.queryByTestId(`note-card-content-${id1}`);
    const note2CardContent = screen.queryByTestId(`note-card-content-${id2}`);

    expect(note1CardContent?.textContent).toEqual(content1);
    expect(note2CardContent?.textContent).toEqual(content2);
  });

  test("Renderizar primeiro o Loader e, depois que o MOCK do get for feito, a lista de notas.", async () => {
    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const notes: INote[] = [{ id: id1, date: new Date(), content: content1 }];

    jest.spyOn(actions, "getAllNotes").mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      return notes;
    });

    customRender(<NoteList />);

    expect(screen.queryByTestId(`note-list-loader`)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId(`note-list-loader`)).not.toBeInTheDocument();
    });

    expect(
      screen.queryByTestId(`note-card-content-${id1}`)?.textContent
    ).toEqual(content1);
  });

  // Talvez não seja necessário, mas ficou para o aprendizado.
  test("Renderizar primeiro o Loader e, depois que o get original for feito, a lista de notas.", async () => {
    (generateUUID as jest.Mock)
      .mockReturnValueOnce("abc-1")
      .mockReturnValueOnce("abc-2")
      .mockReturnValueOnce("abc-3");

    customRender(<NoteList />);

    expect(screen.queryByTestId(`note-list-loader`)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(
          screen.queryByTestId(`note-list-loader`)
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    expect(
      screen.queryByTestId(`note-card-content-abc-1`)?.textContent
    ).toEqual("Nota 01");
  });
});
