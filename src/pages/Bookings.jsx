// Component to show bookings in the table
import BookingTable from "../features/bookings/BookingTable";

// Component to show operations of booking table (filtering and sorting)
import BookingTableOperations from "../features/bookings/BookingTableOperations";

// Styled components
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading>Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
};

export default Bookings;
