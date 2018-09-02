import Axios from "axios";
import {flow, types} from "mobx-state-tree";
import PracticeStore from "./PracticeStore";
import {IPracticeUserData} from "../interface/practice";


export default types
    .model({
        practices: types.array(PracticeStore),
        currentItem: types.maybe(PracticeStore),
        loadingListFlag: types.optional(types.boolean, false),
        loadingItemFlag: types.optional(types.boolean, false),
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
        createPractice: flow(function* (item:IPracticeUserData) {
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
        updatePractice: flow(function* (id: string, item:IPracticeUserData) {
            self.updatingFlag = true;

            const response = yield Axios.put(`/api/practice/${id}`, item);

            if (response.data) {
                self.currentItem = undefined;
            }
            self.updatingFlag = false;
        }),
    }));

