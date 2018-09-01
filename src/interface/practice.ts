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

export const IPracticeUserDataKeys = <Array<keyof IPracticeUserData>> Object.keys(<IPracticeUserData>{
    description: "",
    name: "",
    metrics: [],
});
