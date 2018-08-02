import Axios from "axios";
import * as React from "react";
import {FormEvent} from "react";
import {IMagistralDirectionData} from "../../interface/magistral-direction";

export default class NewMagistralDirectionForm extends React.Component<any, any> {
    private nameInput : HTMLInputElement;
    private descriptionInput : HTMLTextAreaElement;

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    Name: <input ref={(ref:HTMLInputElement) => this.nameInput = ref}/>
                </div>
                <div>
                    Description:
                    <textarea ref={(ref:HTMLTextAreaElement) => this.descriptionInput = ref}/>
                </div>
                <div>
                    <button>Create</button>
                </div>
            </form>
        )
    }


    private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const item: IMagistralDirectionData = {
            name: this.nameInput.value,
            descrption: this.descriptionInput.value,
        };
        console.log(item);
        Axios.post("/api/magistral-direction/", item);
    }
}
