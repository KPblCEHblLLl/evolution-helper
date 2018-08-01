import styled from "styled-components";
import StyledLink from "../../StyledLink";

export const MainMenu = styled.div`
    display: flex;
    background-color: #e5e5e5;
    padding-bottom: 3px;
`;

export const MainMenuLink = styled(StyledLink)`
    flex: 1;
    box-sizing: border-box;
    margin-right: 3px;
    padding: 6px 8px;
    &:last-child {
      margin-right: 0px;
    }
`;
