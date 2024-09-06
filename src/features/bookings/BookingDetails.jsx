import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Component for controll booking status and update booking data
import BookingDataBox from "./BookingDataBox";

// Styled components
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetails = ({ booking }) => {
  const navigate = useNavigate();

  // Destructuring bookingId and status from booking object
  const { id: bookingId, status } = booking;

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading>Booking #{bookingId}</Heading>
          <Tag>{status}</Tag>
        </HeadingGroup>
        <Button onClick={handleGoBack}>&larr; Back</Button>
      </Row>
      <BookingDataBox booking={booking} />
    </>
  );
};

export default BookingDetails;
