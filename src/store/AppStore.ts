import {inject} from "mobx-react";
import {TypedInject} from "../util/TypedInject";
import MagistralDirectionPageStore from "./MagistralDirectionPageStore";

export const appStores = {
    magistralDirection: MagistralDirectionPageStore.create(),
};

export const typedInject = inject as TypedInject<typeof appStores>;
