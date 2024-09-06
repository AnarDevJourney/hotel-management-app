import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// function for login
import { login } from "../../services/apiAuth";

// Spinner component to show mutation is still continues
import Spinner from "../../ui/Spinner";

// Styled components
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using login function with React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Error: ", err);
      toast.error("Email or password are incorrect");
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    mutate();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
