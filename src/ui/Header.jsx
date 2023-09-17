import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-400);
  padding: 1rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
