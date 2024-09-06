import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Function for fetching settings
import { getSettings } from "../../services/apiSettings";

// Function for updating settings
import { updateSettings } from "../../services/apiSettings";

// Styled components
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Label } from "../../ui/Label";
import { FormError } from "../../ui/FormError";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

const UpdateSettingsForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  // Fetching settings with using React Query
  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Updating settings with using React Query
  const { mutate, isLoading: isUpdatingSettings } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const {
    minBookingLength = 0,
    maxBookingLength = 0,
    maxGuestsPerBooking = 0,
    breakfastPrice = 0,
  } = settings;

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="minBookingLength">Minimum nights/booking</Label>
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Negative values are not acceptable",
            },
          })}
        />
        {errors?.minBookingLength?.message && (
          <FormError>{errors.minBookingLength.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxBookingLength">Maximum nights/booking</Label>
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Negative values are not acceptable",
            },
          })}
        />
        {errors?.maxBookingLength?.message && (
          <FormError>{errors.maxBookingLength.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxGuestsPerBooking">Maximum guests/booking</Label>
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Negative values are not acceptable",
            },
          })}
        />
        {errors?.maxGuestsPerBooking?.message && (
          <FormError>{errors.maxGuestsPerBooking.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfastPrice">Breakfast price</Label>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Negative values are not acceptable",
            },
          })}
        />
        {errors?.breakfastPrice?.message && (
          <FormError>{errors.breakfastPrice.message}</FormError>
        )}
      </FormRow>
      <Button type="submit" disabled={isUpdatingSettings}>
        {isUpdatingSettings ? "Updating..." : "Update settings"}
      </Button>
    </Form>
  );
};

export default UpdateSettingsForm;
