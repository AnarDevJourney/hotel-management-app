import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// Function for fetching current user
import { getCurrentUser } from "../services/apiAuth";

import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const UserName = styled.span`
  font-size: 1.4rem;
`;

const Header = () => {
  // Fetching current user with using React Query
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // Destructuring username from user object
  const { fullName } = user.user_metadata;
  return (
    <StyledHeader>
      <UserName>{fullName}</UserName>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
