import { useEffect, useState } from "react";
import styles from "@/styles/Main.module.css";
import { Container } from "react-bootstrap";
import { getTodos } from "@/apis/todo/todo";
import { useQuery } from "@tanstack/react-query";
import TodoList from "./TodoList";
import TodoSearch from "./TodoSearch";
import TodoPagination from "./TodoPagination";
import useTodoStore from "@/store/todoStore";
import { QUERY_KEYS } from "@/constants/query-key";

const MainContainer = () => {
  const { data } = useQuery({ queryKey: [QUERY_KEYS.TODOS], queryFn: getTodos, refetchOnWindowFocus: false });
  const { actions, todos } = useTodoStore((store) => store);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    if (keyword === "") {
      actions.setTodos(data ?? []);
    } else {
      const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(keyword.toLowerCase()));
      actions.setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    actions.setTodos(data ?? []);
  }, [actions, data]);

  return (
    <Container className={styles.container}>
      <TodoSearch handleSearchChange={handleSearchChange} />
      <TodoList currentPage={currentPage} todos={todos} />
      <TodoPagination current={{ currentPage, setCurrentPage }} todos={todos} />
    </Container>
  );
};

export default MainContainer;
