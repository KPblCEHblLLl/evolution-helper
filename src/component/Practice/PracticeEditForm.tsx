import {observer} from "mobx-react";
import * as React from "react";
import {typedInject} from "../../store/AppStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";
import PracticePageStore from "../../store/PracticePageStore";
import {PracticeMetricStoreType} from "../../store/PracticeStore";
import MagistralDirectionAutosuggest from "../Autosuggest/MagistralDirectionAutosuggest";
import {ReactNode} from "react";
import {MagistralDirectionClassifStoreType} from "../../store/MagistralDirectionClassifStore";
import PracticeMetricEditForm from "./PracticeMetricEditForm";

interface IProps {
    onEdit: (id: string) => void
    onCreate: () => void
    practice: typeof PracticePageStore.Type
    id: string
}

class PracticeEditForm extends React.Component<IProps> {
    private static renderMagistralDirection(direction: MagistralDirectionClassifStoreType, key: number): ReactNode {
        return (
            <MagistralDirectionAutosuggest target={direction} key={key}/>
        )
    }
    private static renderMetric(metric: PracticeMetricStoreType, key: number): ReactNode {
        return (
            <PracticeMetricEditForm metric={metric} key={key}/>
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
            <form>
                <div>
                    Name: <input value={item.name} onChange={this.onChangeName}/>
                </div>
                <div>
                    Description:
                    <textarea value={item.description} onChange={this.onChangeDescription}/>
                </div>
                <div>
                    Metrics:
                    {item.metrics.map(PracticeEditForm.renderMetric)}
                    <input type='button' value='add' onClick={this.addMetric} />
                </div>
                <div>
                    Magistral directions:
                    {item.magistralDirections.map(PracticeEditForm.renderMagistralDirection)}
                    <input type='button' value='add' onClick={this.addDirection} />
                </div>
                <div>
                    <ProgressButton onClick={this.handleSubmit}
                                    loading={this.props.practice.savingFlag}>
                        {this.props.id ? "Update" : "Create"}
                    </ProgressButton>
                </div>
            </form>
        )
    }

    private onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = this.props.practice.currentItem;
        if (item === undefined) {
            return
        }
        item.setName(e.target.value);
    };

    private onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const item = this.props.practice.currentItem;
        if (item === undefined) {
            return
        }
        item.setDescription(e.target.value);
    };

    private handleSubmit = () => {
        if (this.props.id === "") {
            this.props.practice.saveCurrentPractice()
                .then(this.props.onCreate);
        } else {
            this.props.practice.saveCurrentPractice()
                .then(() => {
                    this.props.onEdit(this.props.id);
                 });
        }
    };

    private addDirection = () => {
        const item = this.props.practice.currentItem;
        if (item === undefined) {
            return
        }
        item.addMagistralDirection();
    };

    private addMetric = () => {
        const item = this.props.practice.currentItem;
        if (item === undefined) {
            return
        }
        item.addMetric();
    };
}

export default typedInject("practice")(observer(PracticeEditForm));
