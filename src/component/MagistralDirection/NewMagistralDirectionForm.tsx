import * as React from "react";


export default class NewMagistralDirectionForm extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <div>
                    Name: <input/>
                </div>
                <div>
                    Description:
                    <textarea/>
                </div>
                <div>
                    <button>Create</button>
                </div>
            </div>
        )
    }
}
