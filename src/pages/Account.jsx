import { useQuery } from "@tanstack/react-query";

// Function for fetching current user
import { getCurrentUser } from "../services/apiAuth";

// Component to update user account
import UpdateUserAccount from "../features/authentication/UpdateUserAccount";

// Styled components
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

const Account = () => {
  // Fetching current user with using React Query
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row>
        <Heading>Update account</Heading>
      </Row>
      <Row>
        <UpdateUserAccount user={user} />
      </Row>
    </>
  );
};

export default Account;
