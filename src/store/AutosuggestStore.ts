import {types} from "mobx-state-tree";
import MagistralDirectionAutosuggestStore from "./MagistralDirectionAutosuggestStore";

export default types
    .model({
        magistralDirection: types.array(MagistralDirectionAutosuggestStore),
    })
