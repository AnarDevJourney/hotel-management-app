import styled from "styled-components";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Function for updating booking data
import { updateBooking } from "../../services/apiBookings";

// Component for deleting booking
import DeleteBooking from "./DeleteBooking";

// function for converting iso date format into normal date
import { convertToDate } from "../../utils/helpers";
// function for converting default number into currency
import { formatCurrency } from "../../utils/helpers";

// Icons from react icons
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

// Styled components
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { StyledCheckbox } from "../../ui/CheckBox";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const GuestData = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const CheckInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
`;

const SideBySideButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const BookingDataBox = ({ booking }) => {
  // Destructuring necesserry datas from booking object
  const {
    id: bookingId,
    created_at,
    status,
    startDate,
    endDate,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observation,
    isPaid,
    guests: { fullName: guestName, email, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  // State for confirm booking price is paid
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(isPaid);

  function handleIsPaymentConfirmedChange(e) {
    setIsPaymentConfirmed(e.target.checked);
  }

  const queryClient = useQueryClient();
  // Making booking checked in with using React Query
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked in",
      }),
    onSuccess: () => {
      toast.success(`Booking ${bookingId} successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleCheckIn() {
    checkIn();
  }

  // Making booking checked out with using React Query
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, {
        status: "checked out",
      }),
    onSuccess: () => {
      toast.success(`Booking ${bookingId} successfully checked out`);
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleCheckOut() {
    checkOut();
  }

  if (isCheckingIn || isCheckingOut) {
    return <Spinner />;
  }

  return (
    <>
      <StyledBookingDataBox>
        <Header>
          <div>
            <HiOutlineHomeModern />
            <p>
              {numNights} nights in Cabin <span>{cabinName}</span>
            </p>
          </div>
          <div>
            <p>
              {convertToDate(startDate)} - {convertToDate(endDate)}
            </p>
          </div>
        </Header>
        <Section>
          <Guest>
            {countryFlag && <Flag src={countryFlag} />}
            <GuestData>
              <p>{guestName}</p>
              <p>{email}</p>
              <p>National id: {nationalID}</p>
            </GuestData>
          </Guest>
          {observation && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Observations"
            >
              {observation}
            </DataItem>
          )}
          <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
            {hasBreakfast ? "Yes" : "No"}
          </DataItem>

          <Price isPaid={isPaid}>
            <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
              {formatCurrency(totalPrice)}
              {hasBreakfast &&
                `(${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </DataItem>
            <p>{isPaid ? "Paid" : "Will pay at property"}</p>
          </Price>
        </Section>
        <Footer>
          <p>Booked at: {convertToDate(created_at)}</p>
        </Footer>
      </StyledBookingDataBox>
      {/* if booking status is unconfirmed make checkbox for confirm payment is paid and button for make booking checked in accessible */}
      {status === "unconfirmed" && (
        <StyledBookingDataBox>
          <Section>
            <CheckInContainer>
              <StyledCheckbox>
                <input
                  type="checkbox"
                  id="payment"
                  checked={isPaymentConfirmed}
                  onChange={handleIsPaymentConfirmedChange}
                />
                <label htmlFor="payment">
                  I confirm that {guestName} has paid the total amount of{" "}
                  {formatCurrency(totalPrice)}
                </label>
              </StyledCheckbox>
              <div>
                <SideBySideButtons>
                  <Button
                    disabled={!isPaymentConfirmed || isCheckingIn}
                    onClick={handleCheckIn}
                  >
                    Check in
                  </Button>
                  <DeleteBooking bookingId={bookingId} />
                </SideBySideButtons>
              </div>
            </CheckInContainer>
          </Section>
        </StyledBookingDataBox>
      )}
      {/* if booking status is checked in make button for making booking checked out accessible */}
      {status === "checked in" && (
        <ButtonContainer>
          <SideBySideButtons>
            <Button disabled={isCheckingOut} onClick={handleCheckOut}>
              Check out
            </Button>
            <DeleteBooking bookingId={bookingId} />
          </SideBySideButtons>
        </ButtonContainer>
      )}
      {status === "checked out" && (
        <ButtonContainer>
          <DeleteBooking bookingId={bookingId} />
        </ButtonContainer>
      )}
    </>
  );
};

export default BookingDataBox;
