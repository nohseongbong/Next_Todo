import { Todo } from "@/pages/api/todoList";
import { Container, Accordion } from "react-bootstrap";

interface TodoListProps {
  todos: Todo[];
  currentPage: number;
}

const ITEMS_PER_PAGE = 5;

const TodoList = ({ todos, currentPage }: TodoListProps) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const itemsToShow = todos.slice(startIndex, endIndex);
  return (
    <Container>
      <Accordion defaultActiveKey="0">
        {itemsToShow.map((todo) => {
          return (
            <Accordion.Item key={todo.todoId} eventKey={todo.todoId}>
              <Accordion.Header>{todo.title}</Accordion.Header>
              <Accordion.Body>{todo.content}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default TodoList;
