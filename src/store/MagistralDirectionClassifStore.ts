import {types} from "mobx-state-tree";
import {WithKeys} from "../util/WithKeys";
import {IApiMagistralDirectionClassif} from "../api/model/ApiMagistralDirectionClassif";

const model: WithKeys<IApiMagistralDirectionClassif> = {
    name: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
};

export const MagistralDirectionClassifStore = types.model(model);
export type MagistralDirectionClassifStoreType = typeof MagistralDirectionClassifStore.Type;
