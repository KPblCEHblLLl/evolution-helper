import {observer} from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import {typedInject} from "../../store/AppStore";
import MagistralDirectionPageStore from "../../store/MagistralDirectionPageStore";
import Button from "../Button/Button";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";

const StyledHeader = styled('div')`
     font-size: 18px;
`;

const StyledDescription = styled('div')`
     font-size: 13px;
`;


interface IProps {
    magistralDirection: typeof MagistralDirectionPageStore.Type;
    onItemDelete: () => void;
    onItemEdit: (id: string) => void;
    id: string
}

class MagistralDirectionCard extends React.Component<IProps, any> {
    public componentDidMount() {
        this.props.magistralDirection.loadMagistralDirection(this.props.id);
    }

    public render() {
        const store = this.props.magistralDirection;

        if (store.currentItem === undefined) {
            return <StyledLoader loading={store.loadingItemFlag}/>
        }
        return (
            <div>
                <StyledHeader>{store.currentItem.name}</StyledHeader>
                <StyledDescription>{store.currentItem.description}</StyledDescription>
                <div>
                    <ProgressButton onClick={this.handleDelete}
                                    loading={this.props.magistralDirection.deletingFlag}>Delete</ProgressButton>
                    <Button onClick={this.handleEdit}>Edit</Button>
                </div>
            </div>
        )
    }

    private handleDelete = () => {
        if (!confirm("Are you sure?")) {
            return;
        }
        this.props.magistralDirection.deleteMagistralDirection(this.props.id)
            .then(this.props.onItemDelete);
    };

    private handleEdit = () => {
        this.props.onItemEdit(this.props.id);
    }
}

export default typedInject("magistralDirection")(observer(MagistralDirectionCard));
