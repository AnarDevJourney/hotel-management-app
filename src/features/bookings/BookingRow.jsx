import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Function for convert iso date format into normal date
import { convertToDate } from "../../utils/helpers";
// Function for converting number into currency
import { formatCurrency } from "../../utils/helpers";

// Styled component
import Button from "../../ui/Button";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({ booking }) => {
  const navigate = useNavigate();

  // Destructuring necessery datas from booking object
  const {
    id: bookingId,
    startDate,
    endDate,
    totalPrice,
    status,
    cabins,
    guests,
  } = booking;

  function handleSeeDetails() {
    navigate(`/bookings/${bookingId}`);
  }
  return (
    <>
      <TableRow>
        <Cabin>{cabins.name}</Cabin>
        <Stacked>
          <span>{guests.fullName}</span>
          <span>{guests.email}</span>
        </Stacked>
        <Stacked>
          <span>{convertToDate(startDate)}</span>
          <span>{convertToDate(endDate)}</span>
        </Stacked>
        <Tag>{status}</Tag>
        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Button onClick={handleSeeDetails}>See details</Button>
      </TableRow>
    </>
  );
};

export default BookingRow;
