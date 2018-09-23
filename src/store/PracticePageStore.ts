import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import {PracticeStore} from "./PracticeStore";
import {IApiPracticeUpdate} from "../api/model/ApiPracticeUpdate";
import {IApiPractice} from "../api/model/ApiPractice";
import {ObjectID} from "bson";


export default types
    .model({
        practices: types.array(PracticeStore),
        currentItem: types.maybe(PracticeStore),
        loadingListFlag: types.optional(types.boolean, false),
        loadingItemFlag: types.optional(types.boolean, false),
        savingFlag: types.optional(types.boolean, false),
        creatingFlag: types.optional(types.boolean, false),
        deletingFlag: types.optional(types.boolean, false),
        updatingFlag: types.optional(types.boolean, false),
    })
    .actions(self => ({
        loadList: flow(function* () {
            self.practices.clear();
            self.loadingListFlag = true;

            const response = yield Axios.get("/api/practice");

            self.practices.push(...response.data);
            self.loadingListFlag = false;
        }),
        saveCurrentPractice: flow(function* () {
            if (self.currentItem === undefined) {
                return;
            }
            const item:IApiPractice = self.currentItem;
            self.savingFlag = true;

            const data: IApiPracticeUpdate = {
                name: item.name,
                description: item.description,
                metrics: item.metrics,
                magistralDirections: item.magistralDirections.map(x => x.id),
            };

            const id = item.id;
            if (!ObjectID.isValid(id)) {
                 yield Axios.post("/api/practice", data);
            } else {
                yield Axios.put(`/api/practice/${id}`, data);
            }

            self.savingFlag = false;
        }),
        createPractice: flow(function* (item:IApiPracticeUpdate) {
            self.creatingFlag = true;

            yield Axios.post("/api/practice", item);

            self.creatingFlag = false;
        }),
        loadPractice: flow(function* (id: string) {
            if (id === "") {
                self.currentItem = PracticeStore.create();
                return;
            }
            self.currentItem = undefined;
            self.loadingItemFlag = true;

            const response = yield Axios.get(`/api/practice/${id}`);

            self.currentItem = response.data;
            self.loadingItemFlag = false;
        }),
        deletePractice: flow(function* (id: string) {
            self.deletingFlag = true;

            const response = yield Axios.delete(`/api/practice/${id}`);

            if (response.data) {
                self.currentItem = undefined;
            }
            self.deletingFlag = false;
        }),
    }));

