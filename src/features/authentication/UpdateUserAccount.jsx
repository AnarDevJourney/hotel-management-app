import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Functions for updating username and password
import { updateFullName, changePassword } from "../../services/apiAuth";

// Styled components
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Label } from "../../ui/Label";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { FormError } from "../../ui/FormError";

const UpdateUserAccount = ({ user }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useForm for username
  const {
    register: registerName,
    formState: nameFormState,
    handleSubmit: handleSubmitName,
  } = useForm();
  const { errors: nameErrors } = nameFormState;

  // Destructuring email and user_metadata(it holds user's fullName) from user object
  const { email, user_metadata } = user;
  const { fullName } = user_metadata;

  // Updating username with using React Query
  const { mutate: updateUserName, isLoading: isUpdatingUserName } = useMutation(
    {
      mutationFn: updateFullName,
      onSuccess: () => {
        toast.success("Account successfully updated");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  function onSubmitNameForm({ fullName }) {
    updateUserName(fullName);
  }

  // useForm for password
  const {
    register: registerPassword,
    formState: passwordFormState,
    handleSubmit: handleSubmitPassword,
    getValues: getPasswordValues,
  } = useForm();
  const { errors: passwordErrors } = passwordFormState;

  // Updating password with using React Query
  const { mutate: updatePassword, isLoading: isUpdatingPassword } = useMutation(
    {
      mutationFn: changePassword,
      onSuccess: () => {
        toast.success("Account successfully updated");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        navigate("/login");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  function onSubmitPasswordForm({ newPassword }) {
    updatePassword(newPassword);
  }

  return (
    <>
      {/* Form for update username */}
      <Form onSubmit={handleSubmitName(onSubmitNameForm)}>
        <FormRow>
          <Label>Email adress</Label>
          <Input type="email" disabled value={email} />
        </FormRow>
        <FormRow>
          <Label>Full name</Label>
          <Input
            type="text"
            defaultValue={fullName}
            {...registerName("fullName", {
              required: "This field is required",
            })}
            disabled={isUpdatingUserName}
          />
          {nameErrors?.fullName?.message && (
            <FormError>{nameErrors.fullName.message}</FormError>
          )}
        </FormRow>
        <FormRow>
          <Button disabled={isUpdatingUserName}>Update username</Button>
        </FormRow>
      </Form>

      {/* Form for update password */}
      <Form onSubmit={handleSubmitPassword(onSubmitPasswordForm)}>
        <FormRow>
          <Label>New password (min 8 chars)</Label>
          <Input
            type="password"
            {...registerPassword("newPassword", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minumum of 8 characters",
              },
            })}
            disabled={isUpdatingPassword}
          />
          {passwordErrors?.newPassword?.message && (
            <FormError>{passwordErrors.newPassword.message}</FormError>
          )}
        </FormRow>
        <FormRow>
          <Label>Confirm password</Label>
          <Input
            type="password"
            {...registerPassword("newPasswordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getPasswordValues().newPassword ||
                "Passwords need to match",
            })}
            disabled={isUpdatingPassword}
          />
          {passwordErrors?.newPasswordConfirm?.message && (
            <FormError>{passwordErrors.newPasswordConfirm.message}</FormError>
          )}
        </FormRow>
        <FormRow>
          <Button disabled={isUpdatingPassword}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
};

export default UpdateUserAccount;
