import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import MagistralDirectionState from "./MagistralDirectionState";


export default types
    .model({
        magistralDirections: types.array(MagistralDirectionState),
    })
    .actions(self => ({
        loadList: flow(function* () {
            const response = yield Axios.get("/api/magistral-direction");
            self.magistralDirections.push(...response.data);
        })
    }));

