import styled from "styled-components";

// Component to show statistics about different things of hotel
import Stat from "./Stat";

// Function for converting number into currency
import { formatCurrency } from "../../utils/helpers";

// Icons from react icons
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
} from "react-icons/hi2";

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Stats = ({ bookings, cabins }) => {
  const numBookings = bookings.length;

  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const numCheckIns = bookings.filter(
    (booking) => booking.status === "checked in"
  ).length;

  const numCabins = cabins.length;
  return (
    <StatsContainer>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title="Cabins"
        color="yellow"
        icon={<HiOutlineHomeModern />}
        value={numCabins}
      />
    </StatsContainer>
  );
};

export default Stats;
