import {types} from "mobx-state-tree";

export default types.model({
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),

    _id: types.optional(types.string, ""),
    dateModified: types.optional(types.string, ""),
    dateCreated: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
    __v: types.optional(types.number, 0),
})
