import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getAllNotes } from "../../data/notes";

export const useNoteList = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const { data, isFetching } = useQuery({
    queryKey: ["note-list", search],
    queryFn: () => getAllNotes({ search: search }),
    refetchOnWindowFocus: false,
  });

  return {
    notes: data,
    isLoading: isFetching,
  };
};
