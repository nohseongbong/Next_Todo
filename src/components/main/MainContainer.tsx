/* eslint-disable react-hooks/exhaustive-deps */
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
  const { actions, filteredTodos } = useTodoStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    actions.setTodos(data ?? []);
  }, [data]);

  return (
    <Container className={styles.container}>
      <TodoSearch handleSearchChange={actions.setSearchKeyword} />
      <TodoList currentPage={currentPage} todos={filteredTodos} />
      <TodoPagination currentPage={currentPage} setCurrentPage={setCurrentPage} todos={filteredTodos} />
    </Container>
  );
};

export default MainContainer;
