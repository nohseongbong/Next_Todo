import { useEffect, useState } from "react";
import styles from "@/styles/Main.module.css";
import { Button, Container } from "react-bootstrap";
import { getTodos } from "@/apis/todo/todo";
import { useQuery } from "@tanstack/react-query";
import TodoList from "./TodoList";
import TodoSearch from "./TodoSearch";
import TodoPagination from "./TodoPagination";
import useTodoStore from "@/store/todoStore";
import { useRouter } from "next/router";

const MainContainer = () => {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos, refetchOnWindowFocus: false });
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
      <div style={{ display: "flex", gap: 10, margin: "10px 0px" }}>
        <Button onClick={() => router.push("/login")} variant="secondary" className="ml-2">
          Login
        </Button>
        <Button onClick={() => router.push("/create")} variant="secondary" className="ml-2">
          Create
        </Button>
      </div>
      <TodoPagination current={{ currentPage, setCurrentPage }} todos={todos} />
    </Container>
  );
};

export default MainContainer;
