import styled from 'styled-components';
import StyledLink from "../../StyledLink"
import {StyledPageBody} from "../StyledPage"

export const StyledGlossaryPage = styled(StyledPageBody)`
     padding: 10px 10px;
`;

export const StyledHeader = styled.div`
     margin: 0 10px;
`;

export const StyledList = styled.div`
      text-align: center;
      margin: 0 10px;
`;

export const StyledListLink = styled(StyledLink)`
      margin: 10px;
      width: 300px;
      height: 100px;
      line-height: 100px;
      background-color: paleturquoise;
`;
