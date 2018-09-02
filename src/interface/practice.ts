import MetricDimension from "../enum/MetricDimension";
import {ObjectID} from "bson";

export interface IPracticeMetric {
    name: string,
    description: string,
    dimension: keyof typeof MetricDimension,
}

export interface IPracticeUserData {
    description: string,
    name: string,
    magistralDirection: ObjectID[],
    metrics: IPracticeMetric[],
}

export interface IPracticeServiceData {
    dateCreated: Date,
    dateModified?: Date,
    userId: ObjectID,
}

export interface IPractice extends IPracticeUserData, IPracticeServiceData{
}

const sample: IPracticeUserData = {
    description: "",
    name: "",
    magistralDirection: [],
    metrics: [],
};
export const IPracticeUserDataKeys: Array<keyof IPracticeUserData> =  Object.keys(sample) as Array<keyof IPracticeUserData>;
