import {Schema} from 'mongoose';
import MetricDimension from "../enum/MetricDimension";

export interface IPracticeMetric {
    name: string,
    description: string,
    dimension: MetricDimension,
}

export interface IPracticeUserData {
    description: string,
    name: string,
    metrics: IPracticeMetric[],
}

export interface IPracticeServiceData {
    dateCreated: Date,
    dateModified?: Date,
    userId: Schema.Types.ObjectId,
}

export interface IPractice extends IPracticeUserData, IPracticeServiceData{
}

const sample: IPracticeUserData = {
    description: "",
    name: "",
    metrics: [],
};
export const IPracticeUserDataKeys: Array<keyof IPracticeUserData> =  Object.keys(sample) as Array<keyof IPracticeUserData>;
