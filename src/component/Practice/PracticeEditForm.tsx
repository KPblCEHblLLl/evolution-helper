import {observer} from "mobx-react";
import * as React from "react";
import {typedInject} from "../../store/AppStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";
import PracticePageStore from "../../store/PracticePageStore";
import {IPracticeUserData} from "../../interface/practice";

interface IProps {
    onEdit: (id: string) => void
    onCreate: () => void
    practice: typeof PracticePageStore.Type
    id: string
}

class PracticeEditForm extends React.Component<IProps, any> {
    private nameInput: HTMLInputElement;
    private descriptionInput: HTMLTextAreaElement;

    public componentDidMount() {
        this.props.practice.loadPractice(this.props.id);
    }

    public render() {
        const store = this.props.practice;

        if (store.currentItem === undefined) {
            return <StyledLoader loading={store.loadingItemFlag}/>
        }

        return (
            <form>
                <div>
                    Name: <input ref={(ref: HTMLInputElement) => this.nameInput = ref}
                                 defaultValue={store.currentItem.name}/>
                </div>
                <div>
                    Description:
                    <textarea ref={(ref: HTMLTextAreaElement) => this.descriptionInput = ref}
                              defaultValue={store.currentItem.description}/>
                </div>
                <div>
                    <ProgressButton onClick={this.handleSubmit}
                                    loading={this.props.practice.updatingFlag}>
                        {this.props.id ? "Update" : "Create"}
                    </ProgressButton>
                </div>
            </form>
        )
    }

    private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const item: IPracticeUserData = {
            name: this.nameInput.value,
            description: this.descriptionInput.value,
            metrics: [],
            magistralDirection: [],
        };

        if (this.props.id === "") {
            this.props.practice.createPractice(item)
                .then(this.props.onCreate);
        } else {
            this.props.practice.updatePractice(this.props.id, item)
                .then(() => {
                    this.props.onEdit(this.props.id);
                });
        }
    }
}

export default typedInject("practice")(observer(PracticeEditForm));
