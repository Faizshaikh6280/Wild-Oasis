import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-400);
  padding: 1.5rem 2rem;

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
