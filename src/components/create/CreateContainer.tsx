import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/Main.module.css";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@/apis/todo/todo";
import { useRouter } from "next/router";

const CreateContainer = () => {
  const route = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      route.push("/");
    },
  });

  const handleCreate = () => {
    mutation.mutate({ title, content });
  };

  return (
    <Container className="mt-5">
      <h1>Create ToDo</h1>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            className={styles.create_content}
            as="textarea"
            rows={3}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <div className={styles.create_btn_wrap}>
          <Button variant="primary" onClick={handleCreate}>
            생성
          </Button>
          <Link href="/">
            <Button variant="secondary" className="ml-2">
              목록
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default CreateContainer;
