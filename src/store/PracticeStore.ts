import {types} from "mobx-state-tree";
import MetricType from "../enum/MetricType";
import {WithKeys} from "../util/WithKeys";
import {IApiPractice} from "../api/model/ApiPractice";
import {IApiPracticeMetric} from "../api/model/ApiPracticeMetric";
import {MagistralDirectionClassifStore} from "./MagistralDirectionClassifStore";

const metricModel: WithKeys<IApiPracticeMetric> = {
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    type: types.optional(types.string, MetricType[MetricType.NUMBER]),
    dimension: types.optional(types.string, ""),
};

export const PracticeMetric = types.model(metricModel);

const model: WithKeys<IApiPractice> = {
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    metrics: types.array(PracticeMetric),
    id: types.optional(types.string, ""),
    magistralDirections: types.array(MagistralDirectionClassifStore),
};

export const PracticeStore = types.model(model)
    .actions(self => {
    function setName(newName: string) {
        self.name = newName;
    }

    function setDescription(newDescription: string) {
        self.description = newDescription;

    }

    return {
        setName,
        setDescription,
    }
});
export type PracticeStoreType = typeof PracticeStore.Type;
