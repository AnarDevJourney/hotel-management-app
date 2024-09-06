// Component for filtering bookings
import FilterBookings from "./FilterBookings";

// Component for sorting bookings
import SortBookings from "./SortBookings";

// Styled component
import TableOperations from "../../ui/TableOperations";

const BookingTableOperations = () => {
  return (
    <TableOperations>
      <FilterBookings />
      <SortBookings />
    </TableOperations>
  );
};

export default BookingTableOperations;
