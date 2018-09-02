import {observer} from "mobx-react";
import * as React from 'react';
import styled from 'styled-components';
import {typedInject} from "../../store/AppStore";
import PracticeStore from "../../store/PracticeStore";
import StyledLoader from "../Loader/StyledLoader";
import StyledListLink from "../StyledListLink";
import PracticePageStore from "../../store/PracticePageStore";

const StyledHeader = styled('div')`
     font-size: 18px;
`;

const StyledDescription = styled('div')`
     font-size: 13px;
`;

const StyledList = styled('ul')`
     padding: 0;
`;

const StyledListItem = styled('li')`
     list-style: none;
     margin: 0;
     padding: 8px 12px;
`;

const PracticeItem = (props: { item: typeof PracticeStore.Type }) => (
    <StyledListItem>
        <StyledHeader>{props.item.name}</StyledHeader>
        <StyledDescription>{props.item.description}</StyledDescription>
    </StyledListItem>
);

interface IProps {
    path: string;
    practice: typeof PracticePageStore.Type;
}

class PracticesList extends React.Component<IProps> {
    public componentDidMount() {
        this.props.practice.loadList();
    }

    public render() {
        return (
            <div>
                <StyledList>
                    {this.props.practice.practices.map((item: typeof PracticeStore.Type, idx: number) => (
                        <StyledListLink to={`${this.props.path}/view/${item._id}`}>
                            <PracticeItem item={item} key={idx}/>
                        </StyledListLink>
                    ))}
                </StyledList>
                <StyledLoader loading={this.props.practice.loadingListFlag}/>
            </div>
        )
    }
}

export default typedInject("practice")(observer(PracticesList));
