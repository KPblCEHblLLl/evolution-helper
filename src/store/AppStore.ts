import {inject} from "mobx-react";
import MagistralDirectionPageStore from "./MagistralDirectionPageStore";
import {TypedInject} from "../util/TypedInject";
import PracticePageStore from "./PracticePageStore";
import AutosuggestStore from "./AutosuggestStore";

export const appStores = {
    magistralDirection: MagistralDirectionPageStore.create(),
    practice: PracticePageStore.create(),
    autosuggest: AutosuggestStore.create(),
};

export const typedInject = inject as TypedInject<typeof appStores>;
