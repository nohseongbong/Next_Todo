import { useEffect, useState } from "react";
import { Card, Button, Container, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "@/api/todo/todo";
import styles from "@/styles/Main.module.css";
import { useTodoDetail } from "@/hook/useTodoDetail";
import { useTodoUpdate } from "@/hook/useTodoUpdate";

const TodoContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { todoDetail, isLoading, isError } = useTodoDetail({ id: Number(id) });
  const mutation = useTodoUpdate({ onSuccess: router.back });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickUpdate = () => {
    if (id && title && content) {
      mutation.mutate({ id: Number(id), title, content });
    }
  };
  const onClickGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (todoDetail) {
      setTitle(todoDetail.title);
      setContent(todoDetail.content);
    }
  }, [todoDetail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <Container className={`my-4`}>
      <Card>
        <Card.Body>
          <Card.Title>Todo Detail</Card.Title>
          <Card.Text>
            제목: <FormControl type="text" value={title} onChange={handleTitleChange} />
          </Card.Text>
          <Card.Text>내용:</Card.Text>
          <Card.Text>
            <FormControl as="textarea" rows={5} value={content} onChange={handleContentChange} />
          </Card.Text>
          <Button className={styles.detail_btn} variant="primary" onClick={onClickGoBack}>
            목록
          </Button>
          <Button variant="primary" onClick={onClickUpdate}>
            수정하기
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoContainer;
