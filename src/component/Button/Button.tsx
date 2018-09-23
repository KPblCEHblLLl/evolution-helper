import * as React from "react";
import styled from "styled-components";
import Shadow from "../Shadow";


const Wrap = styled.div`
     position: relative;
     border-radius: 3px;
`;

const Button = styled.button`
     cursor: pointer;
     border: none;
     background: transparent;
     outline: none;
     padding: 4px 12px;
     border-radius: inherit;
   
     :active {
          background-color: gray;
     }
`;
export default (props: React.HTMLAttributes<HTMLButtonElement>) => (
    <Wrap>
        <Shadow/>
        <Button type="button" className={props.className} onClick={props.onClick}>
            {props.children}
        </Button>
    </Wrap>
)
