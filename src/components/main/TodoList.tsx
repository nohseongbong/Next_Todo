import { deleteTodo, updateTodo } from "@/apis/todo/todo";
import { TodoType } from "@/types/todo";
import { useMutation } from "@tanstack/react-query";
import { Container, Accordion, Button } from "react-bootstrap";

interface TodoListProps {
  todos: TodoType[];
  currentPage: number;
}

const ITEMS_PER_PAGE = 5;

const TodoList = ({ todos, currentPage }: TodoListProps) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const itemsToShow = todos.slice(startIndex, endIndex);

  const mutation = useMutation(deleteTodo, {
    onSuccess: (data) => {
      console.log(data, ": data");
    },
  });
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
              <Accordion.Body>
                {todo.content}
                <Button onClick={() => onClickDelete(todo.id)} variant="secondary" className="ml-2">
                  삭제
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default TodoList;
