import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatDate } from "date-fns/format";
import { NoteCard } from ".";
import * as useNoteActions from "../../hooks/notes-hook/use-note-actions";
import { INote } from "../../types/note-type";

jest.mock("date-fns/format", () => ({
  formatDate: jest.fn(),
}));

jest.spyOn(useNoteActions, "useNoteActions").mockReturnValue({
  createNoteFn: jest.fn(),
  handleDeleteNote: jest.fn(),
});

describe("Componente: NoteCard", () => {
  test("Renderizar as informações da nota corretamente", () => {
    const id = faker.string.uuid();
    const date = faker.date.anytime();
    const title = faker.lorem.word();
    const content = faker.lorem.text();

    const note: INote = {
      id,
      date,
      title,
      content,
    };

    (formatDate as jest.Mock).mockReturnValue("10/02/2024");

    render(<NoteCard note={note} />);

    const noteCardDate = screen.queryByTestId("note-card-date");
    const noteCardContent = screen.queryByTestId(`note-card-content-${id}`);
    const noteCardTitle = screen.queryByTestId(`note-card-title-${id}`);

    expect(formatDate).toHaveBeenCalledWith(date, "dd/MM/yyyy");
    expect(noteCardDate?.textContent).toEqual("10/02/2024");
    expect(noteCardTitle?.textContent).toEqual(title);
    expect(noteCardContent?.textContent).toEqual(content);
  });

  test("Ao clicar no card, abrir o modal e, ao clicar no botão de fechar o modal, fechá-lo.", async () => {
    const id = faker.string.uuid();
    const date = faker.date.anytime();
    const title = faker.lorem.word();
    const content = faker.lorem.text();

    const note: INote = {
      id,
      date,
      title,
      content,
    };

    formatDate as jest.Mock;

    render(<NoteCard note={note} />);

    const noteCard = screen.getByTestId("trigger-view-note-modal");
    await userEvent.click(noteCard);

    await screen.findByTestId(`note-modal-title-${id}`);

    const btnCloseViewModal = await screen.findByTestId(
      "close-view-note-modal"
    );
    await userEvent.click(btnCloseViewModal);

    expect(
      screen.queryByTestId(`note-modal-title-${id}`)
    ).not.toBeInTheDocument();
  });
});
