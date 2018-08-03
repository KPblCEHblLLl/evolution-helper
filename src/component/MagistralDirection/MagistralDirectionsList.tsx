import {observer} from "mobx-react";
import * as React from 'react';
import MagistralDirectionPageState from "../../state/MagistralDirectionPageState";
import MagistralDirectionState from "../../state/MagistralDirectionState";

const MagistralDirectionItem = (props: { item: typeof MagistralDirectionState.Type }) => (
    <li><span>{props.item.name}</span><span>{props.item.description}</span></li>
);

class MagistralDirectionsList extends React.Component<{state: typeof MagistralDirectionPageState.Type}> {
    public render() {
        console.log(this.props.state.magistralDirections.length);

        return (
            <ul>
                {this.props.state.magistralDirections.map((item: typeof MagistralDirectionState.Type, idx: number) => (
                    <MagistralDirectionItem item={item} key={idx}/>
                ))}
            </ul>
        )
    }
}

export default observer(MagistralDirectionsList);
