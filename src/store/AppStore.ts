import {inject} from "mobx-react";
import MagistralDirectionPageStore from "./MagistralDirectionPageStore";
import {TypedInject} from "../util/TypedInject";

export const appStores = {
    magistralDirection: MagistralDirectionPageStore.create(),
};

export const typedInject = inject as TypedInject<typeof appStores>;
