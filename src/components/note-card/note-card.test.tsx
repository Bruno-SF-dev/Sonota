import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { formatDate } from "date-fns/format";
import { NoteCard } from ".";
import { INote } from "../../types/note-type";

jest.mock("date-fns/format", () => ({
  formatDate: jest.fn(),
}));

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

    render(<NoteCard note={note} />, {});

    const noteCardDate = screen.queryByTestId("note-card-date");
    const noteCardContent = screen.queryByTestId(`note-card-content-${id}`);

    expect(formatDate).toHaveBeenCalledWith(date, "dd/MM/yyyy");
    expect(noteCardDate?.textContent).toEqual("10/02/2024");
    expect(noteCardContent?.textContent).toEqual(content);
  });
});
