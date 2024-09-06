import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Function for deleting booking
import { deleteBooking } from "../../services/apiBookings";

// Styled component
import Button from "../../ui/Button";

const DeleteBooking = ({ bookingId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Deleting booking with using React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking #${bookingId} deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleDeleteBooking() {
    mutate();
  }

  return (
    <Button
      variation="danger"
      onClick={handleDeleteBooking}
      disabled={isLoading}
    >
      Delete
    </Button>
  );
};

export default DeleteBooking;
