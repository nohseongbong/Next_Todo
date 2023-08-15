import { Todo } from "@/pages/api/todoList";
import styles from "@/styles/Main.module.css";
import { Container, Form, Accordion, Button } from "react-bootstrap";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <Container>
      <Accordion defaultActiveKey="0">
        {todos.map((todo) => {
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
