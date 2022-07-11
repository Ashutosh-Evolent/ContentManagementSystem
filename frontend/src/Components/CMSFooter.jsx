import { Segment } from "semantic-ui-react";
import styled from "styled-components";
const StyledFooter = styled(Segment)`
  &&&& {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: purple;
    color: white;
    z-index: 100;
    padding: 1re;
    margin: 0;
    text-align: right;
  }
`;
export const CMSFooter = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};
