import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { createNote } from "../../data/api";
import { INote } from "../../types/note-type";

export const useNoteActions = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const { mutateAsync: createNoteFn } = useMutation({
    mutationFn: createNote,
    onSuccess(dataFromApi) {
      if (dataFromApi.id) {
        queryClient.setQueryData<INote[] | undefined>(
          ["note-list", search],
          (data) => {
            if (!data) {
              return;
            }

            return [dataFromApi, ...data];
          }
        );
      }
    },
  });

  const handleDeleteNote = () => {};

  return {
    createNoteFn,
    handleDeleteNote,
  };
};
