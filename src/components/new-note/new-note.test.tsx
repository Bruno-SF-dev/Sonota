import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewNote } from ".";
import * as useNoteActions from "../../hooks/notes-hook/use-note-actions";
import { customRender } from "../../tests/custom-render";

describe("Componente: NewNote", () => {
  test("Renderizar o botão de criar nova nota, clicar nele, abrir o modal e clicar para fechar o modal.", async () => {
    customRender(<NewNote />);

    const btnNewNote = screen.getByLabelText("Criar nota");
    fireEvent.click(btnNewNote);

    await screen.findByTestId("new-note-modal");

    const btnCloseNewNoteModal = screen.getByTestId("close-new-note-modal");
    fireEvent.click(btnCloseNewNoteModal);

    expect(screen.queryByTestId("new-note-modal")).not.toBeInTheDocument();
  });

  test("Preencher os campos, clicar no botão de salvar a nota e ver se a função de create é chamada com os parâmetros corretos.", async () => {
    const createNoteFnMock = jest.fn();

    jest.spyOn(useNoteActions, "useNoteActions").mockReturnValue({
      createNoteFn: createNoteFnMock,
      handleDeleteNote: jest.fn(),
    });

    customRender(<NewNote />);
    const btnNewNote = screen.getByLabelText("Criar nota");
    fireEvent.click(btnNewNote);

    await screen.findByTestId("new-note-modal");

    const titleField = screen.getByTestId("title-field");
    const contentField = screen.getByTestId("content-field");

    const titleValue = "Título de teste";
    const contentValue = "Conteúdo de teste...";

    await userEvent.type(titleField, titleValue);
    await userEvent.type(contentField, contentValue);

    expect(titleField).toHaveValue(titleValue);
    expect(contentField).toHaveValue(contentValue);

    const btnSubmitCreate = screen.getByTestId("submit-create");
    await userEvent.click(btnSubmitCreate);

    expect(createNoteFnMock).toHaveBeenCalledWith({
      title: titleValue,
      textContent: contentValue,
    });
  });
});
