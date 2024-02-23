import { useSearchParams } from "react-router-dom";
import { INotesFilter } from "./use-search-note";

export const useSubmitSearchNote = () => {
  const [_, setSearchParams] = useSearchParams();

  const onSubmitSearchNote = ({ search }: INotesFilter) => {
    console.log("================== CHEGOU AQUI");
    console.log("================== useSubmitSearchNote: search", search);

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
