import * as React from "react";
import styled from "styled-components";

const Layout = styled.div`
     pointer-events: none;
     position: absolute;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     border-radius: inherit;
`;

const Wrap = styled(Layout)`
`;

const MainShade = styled(Layout)`
     box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
`;
const SubShade = styled(Layout)`
     box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
`;

export default () => (
    <Wrap>
        <MainShade/>
        <SubShade/>
    </Wrap>
);
