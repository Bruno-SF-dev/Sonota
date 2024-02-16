import { fireEvent, screen } from "@testing-library/react";
import { NewNoteCard } from ".";
import { customRender } from "../../tests/custom-render";

describe("NewNote Component", () => {
  test("Only render", async () => {
    customRender(<NewNoteCard />);

    fireEvent.click(screen.getByRole("button"));

    const btnTriggerNewNoteModal = screen.queryByTestId(
      "trigger-new-note-modal"
    );

    expect(btnTriggerNewNoteModal).toBeInTheDocument();
  });
});
