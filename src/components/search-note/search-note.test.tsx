import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { NoteSearch } from ".";
import { customRender } from "../../tests/custom-render";
import * as useSubmitSearchNote from "./hooks/use-submit-search";

describe("Componente: NoteSearch", () => {
  test("Renderizar campo de busca corretamente.", () => {
    customRender(<NoteSearch />);

    expect(screen.queryByTestId("search-note-field")).toBeInTheDocument();
  });

  test("Digitar no campo, clicar no botão de salvar e ver se o getAllNotes é chamado com o valor digitado.", async () => {
    const onSubmitSearchNoteMock = jest.fn();

    jest.spyOn(useSubmitSearchNote, "useSubmitSearchNote").mockReturnValue({
      onSubmitSearchNote: onSubmitSearchNoteMock,
    });

    customRender(<NoteSearch />);

    const searchValue = "Texto buscado...";
    const searchField = screen.getByTestId("search-note-field");

    await userEvent.type(searchField, searchValue);

    expect(searchField).toHaveValue(searchValue);

    const btnSubmitSearchNote = screen.getByTestId("submit-search-note");

    await userEvent.click(btnSubmitSearchNote);

    expect(onSubmitSearchNoteMock).toHaveBeenCalledWith(
      { search: searchValue },
      expect.anything()
    );
  });
});
