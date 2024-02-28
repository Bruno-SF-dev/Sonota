import { screen, waitFor } from "@testing-library/react";
import { NoteList } from ".";
import * as api from "../../data/api";
import * as useNoteList from "../../hooks/notes-hook/use-note-list";
import { customRender } from "../../tests/custom-render";
import { mockGetAllNotes, mockNotes } from "../../tests/mocks/get-all-notes";

describe("Componente: NoteList", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("Exibir o Loader quando os dados estiverem sendo carregados.", () => {
    const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

    useNoteListSpy.mockReturnValueOnce({ notes: mockNotes, isLoading: true });

    customRender(<NoteList />);

    const noteListLoader = screen.queryByTestId("note-list-loader");

    expect(noteListLoader).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^note-card-title-/)).toHaveLength(0);
  });

  test("Exibir a Lista de Notas quando não estiver carregando e houver notas para exibir.", () => {
    const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

    useNoteListSpy.mockReturnValueOnce({ notes: mockNotes, isLoading: false });

    customRender(<NoteList />);

    const noteListLoader = screen.queryByTestId("note-list-loader");

    expect(noteListLoader).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(/^note-card-title-/)).toHaveLength(5);
  });

  test("Exibir a mensagem informando que não há notas e botão de criar quando não estiver carregando e não houver notas para exibir.", () => {
    const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

    useNoteListSpy.mockReturnValueOnce({ notes: [], isLoading: false });

    customRender(<NoteList />);

    const message = screen.queryByText("Crie suas anotações aqui");
    const btnCreate = screen.queryByLabelText("Criar nota");

    expect(message).toBeInTheDocument();
    expect(btnCreate).toBeInTheDocument();
  });

  test("Exibir o Loader e, depois que os dados do Mock estiverem carregados, a Lista de Notas.", async () => {
    jest.spyOn(api, "getAllNotes").mockImplementation(mockGetAllNotes);

    customRender(<NoteList />);

    expect(screen.queryByTestId("note-list-loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("note-list-loader")).not.toBeInTheDocument();
    });

    expect(screen.queryAllByTestId(/^note-card-title-/)).toHaveLength(5);
  });
});
