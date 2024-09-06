import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Component to switch application between dark mode and light mode
import DarkModeToggle from "./DarkModeToggle";

// Component to log out from app
import Logout from "../features/authentication/Logout";

// Icons from react icons
import { HiOutlineUser } from "react-icons/hi2";

// Styled component
import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();

  function handleNavigateUserAccount() {
    navigate("account");
  }
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={handleNavigateUserAccount}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
