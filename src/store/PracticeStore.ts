import {types} from "mobx-state-tree";
import MetricType from "../enum/MetricType";
import {WithKeys} from "../util/WithKeys";
import {IApiPractice} from "../api/model/ApiPractice";
import {IApiPracticeMetric} from "../api/model/ApiPracticeMetric";
import {MagistralDirectionClassifStore} from "./MagistralDirectionClassifStore";
import MetricDimension from "../enum/MetricDimension";

const metricModel: WithKeys<IApiPracticeMetric> = {
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    type: types.optional(types.string, MetricType[MetricType.INTEGER]),
    dimension: types.optional(types.string, ""),
};

export const PracticeMetricStore = types.model(metricModel)
    .actions((self) => {
        function setName(name: string) {
            self.name = name;
        }

        function setDescription(description: string) {
            self.description = description;
        }

        function setType(type: keyof typeof MetricType) {
            self.description = type;
        }

        function setDimension(dimension: keyof typeof MetricDimension) {
            self.dimension = dimension;
        }

        return {
            setName,
            setDescription,
            setType,
            setDimension,
        };
    });
export type PracticeMetricStoreType = typeof PracticeMetricStore.Type;

const model: WithKeys<IApiPractice> = {
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    metrics: types.array(PracticeMetricStore),
    id: types.optional(types.string, ""),
    magistralDirections: types.array(MagistralDirectionClassifStore),
};

export const PracticeStore = types.model(model)
    .actions(self => {
        function setName(name: string) {
            self.name = name;
        }

        function setDescription(description: string) {
            self.description = description;

        }

        function addMagistralDirection() {
            self.magistralDirections.push({});
        }

        function addMetric() {
            self.metrics.push({});
        }

        return {
            setName,
            setDescription,
            addMagistralDirection,
            addMetric,
        }
    });
export type PracticeStoreType = typeof PracticeStore.Type;
