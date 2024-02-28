import { screen, waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useSearchParams from "react-router-dom";
import { Notes } from ".";
import * as useSubmitSearchNote from "../../components/search-note/hooks/use-submit-search";
import * as api from "../../data/api";
import { customRender } from "../../tests/custom-render";
import { mockGetAllNotes } from "../../tests/mocks/get-all-notes";
import * as generateUUID from "../../utils/uuid-generate";

describe("Componente: Notes (pages)", () => {
  test("Renderizar loader e, depois, campo de busca, listagem e botão para criar nota", async () => {
    jest.spyOn(api, "getAllNotes").mockImplementation(mockGetAllNotes);

    customRender(<Notes />);

    expect(screen.queryByTestId("note-list-loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("note-list-loader")).not.toBeInTheDocument()
    );

    expect(
      screen.queryByPlaceholderText("Busque suas notas...")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Buscar nota")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^note-card-title-/)).toHaveLength(5);
  });

  test("Filtrar nota e ver se apenas ela é renderizada na listagem.", async () => {
    jest.spyOn(api, "getAllNotes").mockImplementation(mockGetAllNotes);

    const mockSearchParams = new URLSearchParams();

    jest
      .spyOn(useSearchParams, "useSearchParams")
      .mockImplementation(jest.fn().mockReturnValue([mockSearchParams]));

    const onSubmitSearchNoteMock = jest
      .fn()
      .mockImplementation(({ search }) => {
        mockSearchParams.set("search", search);
      });

    jest.spyOn(useSubmitSearchNote, "useSubmitSearchNote").mockReturnValue({
      onSubmitSearchNote: onSubmitSearchNoteMock,
    });

    const { rerender } = customRender(<Notes />);

    await waitFor(() => {
      expect(screen.queryByTestId("note-list-loader")).not.toBeInTheDocument();
    });

    const searchValue = "Conteúdo 1";
    const searchField = screen.getByPlaceholderText("Busque suas notas...");
    await userEvent.type(searchField, searchValue);
    await userEvent.click(screen.getByLabelText("Buscar nota"));

    await act(async () => {
      rerender(<Notes />);
    });

    expect(screen.queryAllByTestId(/^note-card-title-/)).toHaveLength(1);
    expect(screen.queryByText(searchValue)).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test("Criar nota e ver se ela é renderizada na listagem.", async () => {
    jest.spyOn(api, "getAllNotes").mockImplementation(mockGetAllNotes);

    const newNoteUUID = "uuid-nova-nota";
    jest.spyOn(generateUUID, "generateUUID").mockReturnValue(newNoteUUID);

    customRender(<Notes />);

    await waitFor(() =>
      expect(screen.queryByTestId("note-list-loader")).not.toBeInTheDocument()
    );

    expect(screen.getAllByTestId(/^note-card-title-/)).toHaveLength(5);

    await userEvent.click(screen.getByLabelText("Criar nota"));

    const titleField = screen.getByPlaceholderText("Título da nota...");
    const contentField = screen.getByPlaceholderText(
      "Digite o que deseja anotar..."
    );
    const titleValue = "Testes no frontend";
    const contentValue =
      "Jest e Testing Libray são as melhores ferramentas de teste";
    await userEvent.type(titleField, titleValue);
    await userEvent.type(contentField, contentValue);
    await userEvent.click(screen.getByLabelText("Salvar nota"));

    await waitFor(
      () => expect(screen.getByText(titleValue)).toBeInTheDocument(),
      {
        timeout: 2000,
      }
    );

    expect(screen.getAllByTestId(/^note-card-title-/)).toHaveLength(6);
  });
});
