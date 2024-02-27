import { useSearchParams } from "react-router-dom";
import { INotesFilter } from "./use-search-note";

export const useSubmitSearchNote = () => {
  const [_, setSearchParams] = useSearchParams();

  const onSubmitSearchNote = ({ search }: INotesFilter) => {
    setSearchParams((state) => {
      if (search) {
        state.set("search", search);
      } else {
        state.delete("search");
      }

      return state;
    });
  };

  return {
    onSubmitSearchNote,
  };
};
