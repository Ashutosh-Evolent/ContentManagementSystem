
import {Segment } from "semantic-ui-react";
import styled from "styled-components";
 


const Header = styled(Segment)`
  &&&& {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color:purple;
    color:white;
    padding:  1rem;
    margin: 0;
    z-index: 100;
  }
`;


export const CMSHeader=({title})=>{
   return(
    <Header>
        {title}
    </Header>
   );
}