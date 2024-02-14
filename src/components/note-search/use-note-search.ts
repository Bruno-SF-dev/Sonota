import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as z from "zod";

const filterSchema = z.object({
  search: z.string(),
});

type INotesFilter = z.infer<typeof filterSchema>;

export const useNoteSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");

  const { register, handleSubmit: hookFormSubmit } = useForm<INotesFilter>({
    resolver: zodResolver(filterSchema),
    values: {
      search: search ?? "",
    },
  });

  const handleFilter = hookFormSubmit(({ search }) => {
    setSearchParams((state) => {
      if (search) {
        state.set("search", search);
      } else {
        state.delete("search");
      }

      return state;
    });
  });

  return {
    handleFilter,
    register,
  };
};
