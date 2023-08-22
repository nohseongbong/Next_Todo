import { login } from "@/apis/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const LoginContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("jwtRefreshKey", data.refreshToken);
      localStorage.setItem("jwtAccessKey", data.accessToken);
      router.push("/");
    },
  });

  const handleLogin = () => {
    mutation.mutate({ email, password });
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default LoginContainer;
