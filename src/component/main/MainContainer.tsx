import { useState } from "react";
import styles from "@/styles/Main.module.css";
import { Container } from "react-bootstrap";
import TodoList from "./TodoList";
import TodoSearch from "./TodoSearch";
import TodoPagination from "./TodoPagination";
import { useTodos } from "@/hook/useTodos";

const MainContainer = () => {
  const { todos, setSearchKeyword } = useTodos();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Container className={styles.container}>
      <TodoSearch handleSearchChange={setSearchKeyword} />
      <TodoList currentPage={currentPage} todos={todos} />
      <TodoPagination currentPage={currentPage} setCurrentPage={setCurrentPage} todos={todos} />
    </Container>
  );
};

export default MainContainer;
