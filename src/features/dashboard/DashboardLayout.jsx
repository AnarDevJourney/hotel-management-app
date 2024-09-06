import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// Function for fetching bookings
import { getBookings } from "../../services/apiBookings";

// Function for fetching cabins
import { getCabins } from "../../services/apiCabins";

// Component to show Hotel statistics
import Stats from "./Stats";

// Pie Chart to show booking nights chart
import DurationChart from "./DurationChart";

// Styled component
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  // Fetching bookings with using React Query
  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  // Fetching cabins with using React Query
  const { data: cabins, isLoading: isLoadingCabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoadingBookings || isLoadingCabins) {
    return <Spinner />;
  }
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} cabins={cabins} />
      <DurationChart bookings={bookings} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
