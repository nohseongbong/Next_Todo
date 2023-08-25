import { getTodos } from "@/api/todo/todo";
import { QUERY_KEYS } from "@/constant/query-key";
import { TodoType } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { data } = useQuery({ queryKey: [QUERY_KEYS.TODOS], queryFn: getTodos, refetchOnWindowFocus: false });

  const setSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    const filterTodos = data?.filter(
      (todo) => todo.title.toLowerCase().includes(keyword.toLowerCase()) || todo.content.toLowerCase().includes(keyword.toLowerCase())
    );
    setTodos(filterTodos ?? []);
  };

  useEffect(() => {
    setTodos(data ?? []);
  }, [data]);

  return { todos, setSearchKeyword };
};
