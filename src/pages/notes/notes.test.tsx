import { screen, waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "react-router-dom";
import { Notes } from ".";
import * as useSubmitSearchNote from "../../components/search-note/hooks/use-submit-search";
import * as api from "../../data/notes";
import { customRender } from "../../tests/custom-render";
import { INote } from "../../types/note-type";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useSearchParams: jest.fn(),
  };
});

describe("Componente: Notes (pages)", () => {
  test("Filtrar nota e ver se ela apenas ela é renderizada na listagem.", async () => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    const onSubmitSearchNoteMock = jest
      .fn()
      .mockImplementation(({ search }) => {
        console.log("SEARCH", search);
        mockSearchParams.set("search", search);
      });

    jest.spyOn(useSubmitSearchNote, "useSubmitSearchNote").mockReturnValue({
      onSubmitSearchNote: onSubmitSearchNoteMock,
    });

    const notes: INote[] = [
      { id: "1", date: new Date(), title: "Título 1", content: "Conteúdo 1" },
      { id: "2", date: new Date(), title: "Título 2", content: "Conteúdo 2" },
    ];

    jest.spyOn(api, "getAllNotes").mockImplementation(async ({ search }) => {
      console.log("===> getAllNotes", search);
      await new Promise((resolve) => setTimeout(resolve, 0));

      return notes;
    });

    const { rerender } = customRender(<Notes />);

    await waitFor(
      () => {
        expect(
          screen.queryByTestId("note-list-loader")
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const searchValue = "Nota buscada";
    const searchField = screen.getByTestId("search-note-field");

    await userEvent.type(searchField, searchValue);

    expect(searchField).toHaveValue(searchValue);

    const btnSubmitSearchNote = screen.getByTestId("submit-search-note");

    await userEvent.click(btnSubmitSearchNote);
    expect(onSubmitSearchNoteMock).toHaveBeenCalledWith(
      {
        search: searchValue,
      },
      expect.anything()
    );

    await act(async () => {
      rerender(<Notes />);
    });

    expect(api.getAllNotes).toHaveBeenCalledWith({ search: searchValue });
  });
});
