import ButtonIcon from "./ButtonIcon";
import { useMode } from "../context/DarkModeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, toggleMode } = useMode();

  return (
    <ButtonIcon onClick={toggleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
