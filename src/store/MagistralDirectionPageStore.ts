import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import {IMagistralDirectionUserData} from "../interface/magistral-direction";
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
            self.magistralDirections.clear();
            self.loadingListFlag = true;

            const response = yield Axios.get("/api/magistral-direction");

            self.magistralDirections.push(...response.data);
            self.loadingListFlag = false;
        }),
        createMagistralDirection: flow(function* (item:IMagistralDirectionUserData) {
            self.creatingFlag = true;

            yield Axios.post("/api/magistral-direction", item);

            self.creatingFlag = false;
        }),
        loadMagistralDirection: flow(function* (id: string) {
            if (id === "") {
                self.currentItem = MagistralDirectionStore.create();
                return;
            }
            self.currentItem = undefined;
            self.loadingItemFlag = true;

            const response = yield Axios.get(`/api/magistral-direction/${id}`);

            self.currentItem = response.data;
            self.loadingItemFlag = false;
        }),
        deleteMagistralDirection: flow(function* (id: string) {
            self.deletingFlag = true;

            const response = yield Axios.delete(`/api/magistral-direction/${id}`);

            if (response.data) {
                self.currentItem = undefined;
            }
            self.deletingFlag = false;
        }),
        updateMagistralDirection: flow(function* (id: string, item:IMagistralDirectionUserData) {
            self.updatingFlag = true;

            const response = yield Axios.put(`/api/magistral-direction/${id}`, item);

            if (response.data) {
                self.currentItem = undefined;
            }
            self.updatingFlag = false;
        }),
    }));

