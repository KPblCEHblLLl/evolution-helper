import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import {IMagistralDirectionData} from "../interface/magistral-direction";
import delay from "../util/delay";
import MagistralDirectionStore from "./MagistralDirectionStore";


export default types
    .model({
        magistralDirections: types.array(MagistralDirectionStore),
        currentItem: types.maybe(MagistralDirectionStore),
        loadingListFlag: types.optional(types.boolean, false),
        loadingItemFlag: types.optional(types.boolean, false),
        creatingFlag: types.optional(types.boolean, false),
        deletingFlag: types.optional(types.boolean, false),
        updatingFlag: types.optional(types.boolean, false),
    })
    .actions(self => ({
        loadList: flow(function* () {
            const d = delay(100);
            self.magistralDirections.clear();
            self.loadingListFlag = true;

            const response = yield Axios.get("/api/magistral-direction");
            yield d;

            self.magistralDirections.push(...response.data);
            self.loadingListFlag = false;
        }),
        createMagistralDirection: flow(function* (item:IMagistralDirectionData) {
            const d = delay(100);
            self.creatingFlag = true;

            yield Axios.post("/api/magistral-direction", item);
            yield d;

            self.creatingFlag = false;
        }),
        loadMagistralDirection: flow(function* (id: string) {
            if (id === "") {
                self.currentItem = MagistralDirectionStore.create();
                return;
            }
            const d = delay(100);
            self.currentItem = undefined;
            self.loadingItemFlag = true;

            const response = yield Axios.get(`/api/magistral-direction/${id}`);
            yield d;

            self.currentItem = response.data;
            self.loadingItemFlag = false;
        }),
        deleteMagistralDirection: flow(function* (id: string) {
            const d = delay(100);
            self.deletingFlag = true;

            const response = yield Axios.delete(`/api/magistral-direction/${id}`);
            yield d;

            if (response.data) {
                self.currentItem = undefined;
            }
            self.deletingFlag = false;
        }),
        updateMagistralDirection: flow(function* (id: string, item:IMagistralDirectionData) {
            const d = delay(100);
            self.updatingFlag = true;

            const response = yield Axios.put(`/api/magistral-direction/${id}`, item);
            yield d;

            if (response.data) {
                self.currentItem = undefined;
            }
            self.updatingFlag = false;
        }),
    }));

