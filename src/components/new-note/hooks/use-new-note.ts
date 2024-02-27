import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ICreateNote } from "../../../data/notes";
import { useNoteActions } from "../../../hooks/notes-hook/use-note-actions";
import { useRecordingHook } from "./use-note-recording";

const createNoteSchema = z.object({
  title: z.string(),
  textContent: z.string(),
});

export const useNewNote = () => {
  const { createNoteFn } = useNoteActions();

  const {
    register,
    handleSubmit: hookFormSubmit,
    resetField,
    setValue,
  } = useForm<ICreateNote>({
    resolver: zodResolver(createNoteSchema),
  });

  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    transcription,
  } = useRecordingHook();

  useEffect(() => {
    setValue("textContent", transcription);
  }, [transcription]);

  const handleCreateNote = hookFormSubmit(async ({ title, textContent }) => {
    try {
      await createNoteFn({ textContent, title });

      toast.success("Nota criada com sucesso!");
      resetField("textContent");
      resetField("title");
    } catch (error) {}
  });

  return {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    handleCreateNote,
    register,
  };
};
