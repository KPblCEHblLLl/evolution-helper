import {observer} from "mobx-react";
import * as React from 'react';
import styled from 'styled-components';
import {typedInject} from "../../store/AppStore";
import MagistralDirectionPageStore from "../../store/MagistralDirectionPageStore";
import MagistralDirectionStore from "../../store/MagistralDirectionStore";
import StyledLoader from "../Loader/StyledLoader";
import StyledListLink from "../StyledListLink";

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

const MagistralDirectionItem = (props: { item: typeof MagistralDirectionStore.Type }) => (
    <StyledListItem>
        <StyledHeader>{props.item.name}</StyledHeader>
        <StyledDescription>{props.item.description}</StyledDescription>
    </StyledListItem>
);

interface IComponentProps {
    path: string;
    magistralDirection: typeof MagistralDirectionPageStore.Type;
}

class MagistralDirectionsList extends React.Component<IComponentProps> {
    public componentDidMount() {
        this.props.magistralDirection.loadList();
    }

    public render() {
        return (
            <div>
                <StyledList>
                    {this.props.magistralDirection.magistralDirections.map((item: typeof MagistralDirectionStore.Type, idx: number) => (
                        <StyledListLink to={`${this.props.path}/id/${item._id}`}>
                            <MagistralDirectionItem item={item} key={idx}/>
                        </StyledListLink>
                    ))}
                </StyledList>
                <StyledLoader loading={this.props.magistralDirection.loadingListFlag}/>
            </div>
        )
    }
}

export default typedInject("magistralDirection")(observer(MagistralDirectionsList));
