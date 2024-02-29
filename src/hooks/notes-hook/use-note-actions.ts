import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { createNote, deleteNote } from "../../data/api";
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

  const { mutateAsync: deleteNoteFn } = useMutation({
    mutationFn: deleteNote,
    onSuccess(dataFromApi) {
      queryClient.setQueryData<INote[] | undefined>(
        ["note-list", search],
        () => {
          return [...dataFromApi];
        }
      );
    },
  });

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNoteFn(id);
      toast.info("Nota deletada");
    } catch {
      toast.error("Erro ao deletar nota");
    }
  };

  return {
    createNoteFn,
    handleDeleteNote,
  };
};
