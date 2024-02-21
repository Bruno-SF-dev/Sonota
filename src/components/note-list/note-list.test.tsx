import { faker } from "@faker-js/faker";
import { screen, waitFor } from "@testing-library/react";
import { NoteList } from ".";
import * as actions from "../../data/notes";
import * as useNoteList from "../../hooks/notes-hook/use-note-list";
import { customRender } from "../../tests/custom-render";
import { INote } from "../../types/note-type";

describe("NoteList Component", () => {
  test("Render note list", () => {
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

  test("Render note list loader", () => {
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

  test("Render note list, mock getAllNotes", async () => {
    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const notes: INote[] = [{ id: id1, date: new Date(), content: content1 }];

    jest.spyOn(actions, "getAllNotes").mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return notes;
    });

    const { debug } = customRender(<NoteList />);
    debug();

    // Se continua em tela, o teste falha aqui
    // aqui falha pq o tempo não é suficiente pra Promise do getAllNote ser resolvida
    // então o loader continua na tela
    // await waitFor(
    //   () => {
    //     expect(
    //       screen.queryByTestId(`note-list-loader`)
    //     ).not.toBeInTheDocument();
    //   },
    //   { timeout: 1000 }
    // );

    // Nesse caso, se o waitFor retorna true permitindo que o loader esteja em tela,
    // o teste continua e falha ao tentar encontrar o conteúdo de note
    // A função callback do waitFor é executada em loop até timeout ser atingido
    // ou enquanto o expect que tá dentro do callback não passa
    // await waitFor(
    //   () => {
    //     expect(screen.queryByTestId(`note-list-loader`)).toBeInTheDocument();
    //   },
    //   { timeout: 1000 }
    // );

    // Se sai da tela, o teste continua, e o waitFor retorna true
    // Aqui, o timeout é suficiente pra getAllNotes ser resolvida, então o loader sai da tela
    // e o waitFor retorna true
    // A função callback do waitFor é executada em loop até timeout ser atingido,
    // ou enquanto o expect que tá dentro do callback não passa
    await waitFor(
      () => {
        expect(
          screen.queryByTestId(`note-list-loader`)
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    debug();

    expect(
      screen.queryByTestId(`note-card-content-${id1}`)?.textContent
    ).toEqual(content1);
  });
});
