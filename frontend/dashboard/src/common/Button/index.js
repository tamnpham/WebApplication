import { StyledButton } from "./styles";

export const Button = ({ color, fixedWidth, children, onClick }) => (
  <StyledButton color={color} fixedWidth={fixedWidth} onClick={onClick}>
    {children}
  </StyledButton>
);
