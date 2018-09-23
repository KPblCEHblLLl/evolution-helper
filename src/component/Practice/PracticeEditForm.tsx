import {observer} from "mobx-react";
import * as React from "react";
import {typedInject} from "../../store/AppStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";
import PracticePageStore from "../../store/PracticePageStore";
import {PracticeMetric} from "../../store/PracticeStore";
import MagistralDirectionAutosuggest from "../Autosuggest/MagistralDirectionAutosuggest";
import {ReactNode} from "react";

type Metric = typeof PracticeMetric.Type;

interface IProps {
    onEdit: (id: string) => void
    onCreate: () => void
    practice: typeof PracticePageStore.Type
    id: string
}

class PracticeEditForm extends React.Component<IProps> {
    private static renderMetric(metric: Metric, key: number): ReactNode {

        return (
            <MagistralDirectionAutosuggest/>
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
                    Magistral directions:
                    {item.metrics.map(PracticeEditForm.renderMetric)}
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
    };
}

export default typedInject("practice")(observer(PracticeEditForm));
