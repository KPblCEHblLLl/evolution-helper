import {ObjectID} from "bson";
import {IApiPracticeMetric} from "./ApiPracticeMetric";

export interface IApiPracticeUpdate {
    description: string,
    name: string,
    magistralDirections: ObjectID[],
    metrics: IApiPracticeMetric[],
}
