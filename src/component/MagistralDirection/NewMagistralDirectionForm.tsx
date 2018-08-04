import {observer} from "mobx-react";
import * as React from "react";
import {IMagistralDirectionData} from "../../interface/magistral-direction";
import MagistralDirectionPageState from "../../state/MagistralDirectionPageState";
import ProgressButton from "../Button/ProgressButton";

class NewMagistralDirectionForm extends React.Component<{ onCreate: () => void, state: typeof MagistralDirectionPageState.Type }, any> {
    private nameInput: HTMLInputElement;
    private descriptionInput: HTMLTextAreaElement;

    public render() {
        return (
            <form>
                <div>
                    Name: <input ref={(ref: HTMLInputElement) => this.nameInput = ref}/>
                </div>
                <div>
                    Description:
                    <textarea ref={(ref: HTMLTextAreaElement) => this.descriptionInput = ref}/>
                </div>
                <div>
                    <ProgressButton onClick={this.handleSubmit} loading={this.props.state.creatingFlag}>Create</ProgressButton>
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
        this.props.state.createMagistralDirection(item).then(this.props.onCreate);
    }
}

export default observer(NewMagistralDirectionForm);
