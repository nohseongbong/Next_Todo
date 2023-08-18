import styles from "@/styles/Main.module.css";
import { Container } from "react-bootstrap";
import { getTodos } from "@/apis/todo/todo";
import { useQuery } from "@tanstack/react-query";
import TodoList from "./TodoList";
import TodoSearch from "./TodoSearch";
import TodoPagination from "./TodoPagination";

const MainContainer = () => {
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos, refetchOnWindowFocus: false });
  const todos = data?.todos ?? [];

  return (
    <Container className={styles.container}>
      <TodoSearch />
      <TodoList todos={todos} />
      <TodoPagination total={todos.length} />
    </Container>
  );
};

export default MainContainer;
