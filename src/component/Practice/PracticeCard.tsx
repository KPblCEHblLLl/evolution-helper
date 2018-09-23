import {observer} from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import {typedInject} from "../../store/AppStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";
import StyledLink from "../StyledLink";
import PracticePageStore from "../../store/PracticePageStore";
import {IApiMagistralDirectionClassif} from "../../api/model/ApiMagistralDirectionClassif";
import {IApiPracticeMetric} from "../../api/model/ApiPracticeMetric";

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
    private static renderMagistralDirection (direction:IApiMagistralDirectionClassif, key: number) {
        return (
            <li key={key}>{direction.name}</li>
        )
    }
    private static renderMetric (metric:IApiPracticeMetric, key: number) {
        return (
            <li key={key}>
                <span title={metric.description}>{metric.name}</span>
                <span> {metric.type}</span>
                {
                    !metric.dimension ? null :
                    <span>[{metric.dimension}]</span>
                }
            </li>
        )
    }

    private static renderDescriptionRow (text: string, key: number) {
        return (
            <div key={key}>{text}</div>
        )
    }

    public componentDidMount() {
        this.props.practice.loadPractice(this.props.id);
    }

    public render() {
        const store = this.props.practice;
        const item = store.currentItem;

        if (item === undefined) {
            return <StyledLoader loading={store.loadingItemFlag}/>
        }
        return (
            <div>
                <StyledHeader>{item.name}</StyledHeader>
                <StyledDescription>{item.description.split('\n').map(PracticeCard.renderDescriptionRow)}</StyledDescription>
                <div>
                    Магистральные направления:
                    <ul>
                        {item.magistralDirections.map(PracticeCard.renderMagistralDirection)}
                    </ul>
                </div>
                <div>
                    Метрики:
                    <ul>
                        {item.metrics.map(PracticeCard.renderMetric)}
                    </ul>
                </div>
                <div>
                    <ProgressButton onClick={this.handleDelete}
                                    loading={store.deletingFlag}>Delete</ProgressButton>
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
