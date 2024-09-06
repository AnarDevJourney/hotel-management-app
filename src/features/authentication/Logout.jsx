import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// function to log out
import { logout } from "../../services/apiAuth";

// Styled component and icon from react icons
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Using logout function with React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
      queryClient.removeQueries();
    },
  });

  function handleLogout() {
    mutate();
  }
  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
