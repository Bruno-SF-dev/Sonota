import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as z from "zod";
import { useSubmitSearchNote } from "./use-submit-search";

const filterSchema = z.object({
  search: z.string(),
});

export type INotesFilter = z.infer<typeof filterSchema>;

export const useSearchNote = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const { register, handleSubmit: hookFormSubmit } = useForm<INotesFilter>({
    resolver: zodResolver(filterSchema),
    values: {
      search: search ?? "",
    },
  });

  const { onSubmitSearchNote } = useSubmitSearchNote();

  const handleSearchNote = hookFormSubmit(onSubmitSearchNote);

  return {
    handleSearchNote,
    register,
  };
};
