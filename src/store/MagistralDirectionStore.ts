import {types} from "mobx-state-tree";
import {WithKeys} from "../util/WithKeys";
import {IApiMagistralDirection} from "../api/model/ApiMagistralDirection";

const model: WithKeys<IApiMagistralDirection> = {
    name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
};

export const MagistralDirectionStore = types.model(model);
export type MagistralDirectionStoreType = typeof MagistralDirectionStore.Type;
