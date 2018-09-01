import {observer} from "mobx-react";
import * as React from "react";
import {IMagistralDirectionData} from "../../interface/magistral-direction";
import {typedInject} from "../../store/AppStore";
import MagistralDirectionPageStore from "../../store/MagistralDirectionPageStore";
import ProgressButton from "../Button/ProgressButton";
import StyledLoader from "../Loader/StyledLoader";

interface IProps {
    onEdit: (id: string) => void
    onCreate: () => void
    magistralDirection: typeof MagistralDirectionPageStore.Type
    id: string
}

class MagistralDirectionEditForm extends React.Component<IProps, any> {
    private nameInput: HTMLInputElement;
    private descriptionInput: HTMLTextAreaElement;

    public componentDidMount() {
        this.props.magistralDirection.loadMagistralDirection(this.props.id);
    }

    public render() {
        const store = this.props.magistralDirection;

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
                                    loading={this.props.magistralDirection.updatingFlag}>
                        {this.props.id ? "Update" : "Create"}
                    </ProgressButton>
                </div>
            </form>
        )
    }

    private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const item: IMagistralDirectionData = {
            name: this.nameInput.value,
            description: this.descriptionInput.value,
        };

        if (this.props.id === "") {
            this.props.magistralDirection.createMagistralDirection(item)
                .then(this.props.onCreate);
        } else {
            this.props.magistralDirection.updateMagistralDirection(this.props.id, item)
                .then(() => {
                    this.props.onEdit(this.props.id);
                });
        }
    }
}

export default typedInject("magistralDirection")(observer(MagistralDirectionEditForm));
