import {Schema} from 'mongoose';
import MetricDimension from "../enum/MetricDimension";

export interface IPracticeMetric {
    name: string,
    description: string,
    dimension: MetricDimension,
}

export interface IPracticeData {
    description: string,
    name: string,
    metrics: IPracticeMetric[],
}

export interface IPractice extends IPracticeData{
    dateCreated: Date,
    dateModified: Date,
    userId: Schema.Types.ObjectId,
}
