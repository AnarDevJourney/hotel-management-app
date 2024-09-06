// Hook for controlling dark mode state
import { useDarkMode } from "../context/DarkModeContext";

// Icons from react icons
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

// Styled component
import ButtonIcon from "./ButtonIcon";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
