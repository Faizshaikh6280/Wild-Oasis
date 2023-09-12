import ButtonIcon from "../ui/ButtonIcon";
import SpinnerMini from "../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "../features/authentication/useLogout";

function Logout() {
  const { logout, isLogout } = useLogout();
  return (
    <ButtonIcon disabled={isLogout} onClick={() => logout()}>
      {!isLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
