import * as React from 'react';
import styled from 'styled-components';
import StyledLoader from "../Loader/StyledLoader";
import Button from "./Button";

const SelfWrapper = styled.div`
     position: relative;
     display: inline-block;
`;

const ChildrenWrapper = styled(Button)`
     visibility: ${(props: {loading: boolean}) => props.loading ? 'hidden' : 'visible'};
`;

const LoaderWrapper = styled.div`
     position: absolute;
     top: 0px;
     left: 0px;
     width: 100%;
     height: 100%;
     pointer-events: none;
`;

interface IProps extends React.HTMLAttributes<HTMLButtonElement>{
    loading: boolean;
}

export default (props: IProps) => (
    <SelfWrapper className={props.className}>
        <ChildrenWrapper loading={props.loading} onClick={props.onClick}>
            {props.children}
        </ChildrenWrapper>

        <LoaderWrapper>
            <StyledLoader loading={props.loading}/>
        </LoaderWrapper>
    </SelfWrapper>
)
