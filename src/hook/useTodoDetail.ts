import { getTodoDetail } from "@/api/todo/todo";
import { QUERY_KEYS } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";

type TodoDetail = {
  id: number;
};

export const useTodoDetail = ({ id }: TodoDetail) => {
  const { data, isLoading, isError } = useQuery([QUERY_KEYS.TODO_DETAIL], () => getTodoDetail({ id }), {
    enabled: id ? true : false,
  });

  return {
    todoDetail: data,
    isLoading,
    isError,
  };
};
