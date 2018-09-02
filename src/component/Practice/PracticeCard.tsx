import {observer} from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import {typedInject} from "../../store/AppStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";
import StyledLink from "../StyledLink";
import PracticePageStore from "../../store/PracticePageStore";

const StyledHeader = styled('div')`
     font-size: 18px;
`;

const StyledDescription = styled('div')`
     font-size: 13px;
`;


interface IProps {
    practice: typeof PracticePageStore.Type;
    onItemDelete: () => void;
    path: string;
    id: string;
}

class PracticeCard extends React.Component<IProps, any> {
    public componentDidMount() {
        this.props.practice.loadPractice(this.props.id);
    }

    public render() {
        const store = this.props.practice;

        if (store.currentItem === undefined) {
            return <StyledLoader loading={store.loadingItemFlag}/>
        }
        return (
            <div>
                <StyledHeader>{store.currentItem.name}</StyledHeader>
                <StyledDescription>{store.currentItem.description}</StyledDescription>
                <div>
                    <ProgressButton onClick={this.handleDelete}
                                    loading={this.props.practice.deletingFlag}>Delete</ProgressButton>
                    <StyledLink to={`${this.props.path}/edit/${this.props.id}`}>
                        Edit
                    </StyledLink>
                </div>
            </div>
        )
    }

    private handleDelete = () => {
        if (!confirm("Are you sure?")) {
            return;
        }
        this.props.practice.deletePractice(this.props.id)
            .then(this.props.onItemDelete);
    };
}

export default typedInject("practice")(observer(PracticeCard));
