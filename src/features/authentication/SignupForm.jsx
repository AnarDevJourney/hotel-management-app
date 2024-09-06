import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Function for sigup
import { signup } from "../../services/apiAuth";

// Styled components
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Label } from "../../ui/Label";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { FormError } from "../../ui/FormError";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // Using signup function with React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account successfully created");
    },
    onSettled: () => {
      reset();
    },
  });

  function onSubmit({ fullName, email, password }) {
    mutate({ fullName, email, password });
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={""}>
        <Label>Full name</Label>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
          disabled={isLoading}
        />
        {errors?.fullName?.message && (
          <FormError>{errors.fullName.message}</FormError>
        )}
      </FormRow>

      <FormRow error={""}>
        <Label>Email adress</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email adress",
            },
          })}
          disabled={isLoading}
        />
        {errors?.email?.message && (
          <FormError>{errors.email.message}</FormError>
        )}
      </FormRow>

      <FormRow error={""}>
        <Label>Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minumum of 8 characters",
            },
          })}
          disabled={isLoading}
        />
        {errors?.password?.message && (
          <FormError>{errors.password.message}</FormError>
        )}
      </FormRow>

      <FormRow error={""}>
        <Label>Repeat password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          disabled={isLoading}
        />
        {errors?.passwordConfirm?.message && (
          <FormError>{errors.passwordConfirm.message}</FormError>
        )}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
