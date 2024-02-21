import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { NoteCard } from ".";
import { INote } from "../../types/note-type";

jest.mock("date-fns", () => ({
  formatDistanceToNow: jest.fn(),
}));

describe("Componente: NoteCard", () => {
  test("Renderizar as informações da nota corretamente", () => {
    const id = faker.string.uuid();
    const date = faker.date.anytime();
    const content = faker.lorem.text();

    const note: INote = {
      id,
      date,
      content,
    };

    (formatDistanceToNow as jest.Mock).mockReturnValue("3 dias antes");

    render(<NoteCard note={note} />, {});

    const noteCardDate = screen.queryByTestId("note-card-date");
    const noteCardContent = screen.queryByTestId(`note-card-content-${id}`);

    expect(formatDistanceToNow).toHaveBeenCalledWith(date, {
      locale: ptBR,
      addSuffix: true,
    });
    expect(noteCardDate?.textContent).toEqual("3 dias antes");
    expect(noteCardContent?.textContent).toEqual(content);
  });
});
