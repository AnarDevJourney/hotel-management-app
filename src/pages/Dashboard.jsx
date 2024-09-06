// Component for making layout of Dashboard
import DashboardLayout from "../features/dashboard/DashboardLayout";

// Styled components
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Heading>Dashboard</Heading>
      </Row>
      <DashboardLayout />
    </>
  );
};

export default Dashboard;
