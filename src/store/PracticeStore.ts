import {types} from "mobx-state-tree";
import MetricNumber from "../enum/MetricType";

const metric = types.model({
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    type: types.optional(types.string, MetricNumber[MetricNumber.NUMBER]),
    dimension: types.optional(types.string, ""),
});

export default types.model({
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    metrics: types.array(metric),

    _id: types.optional(types.string, ""),
    dateModified: types.optional(types.string, ""),
    dateCreated: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
    __v: types.optional(types.number, 0),
})
