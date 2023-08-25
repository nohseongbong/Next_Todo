import { deleteTodo } from "@/api/todo/todo";
import { TodoType } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Accordion, Button } from "react-bootstrap";
import { ITEMS_PER_PAGE } from "@/constant/pagination";
import { QUERY_KEYS } from "@/constant/query-key";
import styles from "@/styles/Main.module.css";
import { useRouter } from "next/router";

interface TodoListProps {
  todos: TodoType[];
  currentPage: number;
}

const TodoList = ({ todos, currentPage }: TodoListProps) => {
  const route = useRouter();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const itemsToShow = todos.slice(startIndex, endIndex);

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    },
  });
  const onClickDetail = (id: number) => {
    route.push(`/todo/${id}`);
  };
  const onClickDelete = (id: number) => {
    mutation.mutate({ id });
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        {itemsToShow.map((todo) => {
          return (
            <Accordion.Item key={todo.id} eventKey={String(todo.id)}>
              <Accordion.Header>{todo.title}</Accordion.Header>
              <Accordion.Body className={`${styles.list_item_body}`}>
                <p className={styles.list_item_text}>{todo.content}</p>
                <div className={styles.list_item_btn_wrap}>
                  <Button onClick={() => onClickDetail(todo.id)} variant="primary" className={`ml-2 ${styles.list_item_btn}`}>
                    상세보기
                  </Button>
                  <Button onClick={() => onClickDelete(todo.id)} variant="secondary" className={`ml-2 ${styles.list_item_btn}`}>
                    삭제
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default TodoList;
