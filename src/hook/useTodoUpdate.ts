import { updateTodo } from "@/api/todo/todo";
import { useMutation } from "@tanstack/react-query";

type UpdateProps = {
  onSuccess: () => void;
};

export const useTodoUpdate = ({ onSuccess }: UpdateProps) => {
  const mutation = useMutation(updateTodo, {
    onSuccess,
  });

  return mutation;
};
