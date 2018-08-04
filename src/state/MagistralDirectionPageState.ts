import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import {IMagistralDirectionData} from "../interface/magistral-direction";
import MagistralDirectionState from "./MagistralDirectionState";


export default types
    .model({
        magistralDirections: types.array(MagistralDirectionState),
        loadingFlag: types.optional(types.boolean, false),
        creatingFlag: types.optional(types.boolean, false),
    })
    .actions(self => ({
        loadList: flow(function* () {
            self.magistralDirections.clear();
            self.loadingFlag = true;
            const response = yield Axios.get("/api/magistral-direction");
            self.magistralDirections.push(...response.data);
            self.loadingFlag = false;
        }),
        createMagistralDirection: flow(function* (item:IMagistralDirectionData) {
            self.creatingFlag = true;
            yield Axios.post("/api/magistral-direction", item);
            self.creatingFlag = false;
        }),
    }));

