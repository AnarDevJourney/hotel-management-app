import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function for fetching bookings
import { getBookings } from "../../services/apiBookings";

// Component to show booking datas in the table row
import BookingRow from "./BookingROw";

// Styled components
import { Table } from "../../ui/Table";
import { TableHeader } from "../../ui/TableHeader";
import Spinner from "../../ui/Spinner";

const BookingTable = () => {
  const [searchParams] = useSearchParams();

  // Fetching bookings with using React Query
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings) {
    return <p>Bookings is empty</p>;
  }

  // Filtering bookings (according to their status (checked in, checked out, unconfirmed))

  // Getting filter option from url
  const filterValue = searchParams.get("status") || "all";

  // creating empty variable for filtered bookings
  let filteredBookings;
  // Filtering
  if (filterValue === "all") {
    filteredBookings = bookings;
  }
  if (filterValue === "checked-out") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked out"
    );
  }
  if (filterValue === "checked-in") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked in"
    );
  }
  if (filterValue === "unconfirmed") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );
  }

  // Sorting bookings

  // Getting sort option from url
  const sortValue = searchParams.get("sort-bookings") || "totalPrice-asc";

  // Creating an array with spliting sort value into field that we will sort and direction
  const [field, direction] = sortValue.split("-");

  // Creating modifier for direction of sorting
  const modifier = direction === "asc" ? 1 : -1;

  // Sorting
  const sortedBookings = filteredBookings.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Table>
      <TableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </TableHeader>
      {sortedBookings.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </Table>
  );
};

export default BookingTable;
