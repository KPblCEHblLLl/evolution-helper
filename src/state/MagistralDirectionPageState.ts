import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import MagistralDirectionState from "./MagistralDirectionState";


export default types
    .model({
        magistralDirections: types.array(MagistralDirectionState),
        loadingFlag: types.optional(types.boolean, false),
    })
    .actions(self => ({
        loadList: flow(function* () {
            self.magistralDirections.clear();
            self.loadingFlag = true;
            const response = yield Axios.get("/api/magistral-direction");
            self.magistralDirections.push(...response.data);
            self.loadingFlag = false;
        })
    }));

