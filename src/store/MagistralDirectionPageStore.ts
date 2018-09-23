import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import {MagistralDirectionStore} from "./MagistralDirectionStore";
import {IApiMagistralDirectionUpdate} from "../api/model/ApiMagistralDirectionUpdate";

const model = {
    magistralDirections: types.array(MagistralDirectionStore),
    currentItem: types.maybe(MagistralDirectionStore),
    loadingListFlag: types.optional(types.boolean, false),
    loadingItemFlag: types.optional(types.boolean, false),
    creatingFlag: types.optional(types.boolean, false),
    deletingFlag: types.optional(types.boolean, false),
    updatingFlag: types.optional(types.boolean, false),
};
export default types
    .model(model)
    .actions(self => ({
        loadList: flow(function* () {
            self.magistralDirections.clear();
            self.loadingListFlag = true;

            const response = yield Axios.get("/api/magistral-direction");

            self.magistralDirections.push(...response.data);
            self.loadingListFlag = false;
        }),
        createMagistralDirection: flow(function* (item:IApiMagistralDirectionUpdate) {
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
        updateMagistralDirection: flow(function* (id: string, item:IApiMagistralDirectionUpdate) {
            self.updatingFlag = true;

            const response = yield Axios.put(`/api/magistral-direction/${id}`, item);

            if (response.data) {
                self.currentItem = undefined;
            }
            self.updatingFlag = false;
        }),
    }));

