import { faker } from "@faker-js/faker";
import { screen } from "@testing-library/react";
import { NoteList } from ".";
import { customRender } from "../../tests/custom-render";
import { INote } from "../../types/note-type";
import * as useNoteList from "./use-note-list";

const useNoteListSpy = jest.spyOn(useNoteList, "useNoteList");

describe("NoteList Component", () => {
  test("Render note list", () => {
    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const id2 = faker.string.uuid();
    const content2 = faker.lorem.text();

    const notes: INote[] = [
      { id: id1, date: new Date(), content: content1 },
      { id: id2, date: new Date(), content: content2 },
    ];

    useNoteListSpy.mockReturnValue({ notes, isLoading: false });

    customRender(<NoteList />);

    const note1CardContent = screen.queryByTestId(`note-card-content-${id1}`);
    const note2CardContent = screen.queryByTestId(`note-card-content-${id2}`);

    expect(note1CardContent?.textContent).toEqual(content1);
    expect(note2CardContent?.textContent).toEqual(content2);
  });

  test("Render note list loader", () => {
    const id1 = faker.string.uuid();
    const content1 = faker.lorem.text();

    const notes: INote[] = [{ id: id1, date: new Date(), content: content1 }];

    useNoteListSpy.mockReturnValue({ notes, isLoading: true });

    customRender(<NoteList />);

    const noteListLoader = screen.queryByTestId("note-list-loader");
    const noteCardContent1 = screen.queryByTestId(`note-card-content-${id1}`);

    expect(noteListLoader).toBeInTheDocument();
    expect(noteCardContent1).toBeNull();
  });
});
