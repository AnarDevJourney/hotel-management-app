import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function for fetching booking data
import { getBooking } from "../services/apiBookings";

// Component to show booking details
import BookingDetails from "../features/bookings/BookingDetails";

// Styled component
import Spinner from "../ui/Spinner";

const Booking = () => {
  // Getting booking id from url
  const { bookingId } = useParams();

  // Fetching booking data by id with using React Query
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return <BookingDetails booking={booking} />;
};

export default Booking;
