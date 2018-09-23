import {Document, model, Model, Schema} from 'mongoose';
import MetricDimension from "../../enum/MetricDimension";
import {ObjectID} from "bson";
import {WithKeys} from "../../util/WithKeys";
import MetricType from "../../enum/MetricType";

export interface IMongoPracticeMetric {
    name: string,
    description: string,
    dimension: keyof typeof MetricDimension,
    type: keyof typeof MetricType,
}

const mongoPracticeMetricSchema: WithKeys<IMongoPracticeMetric> = {
    description: {type: String},
    name: {type: String, required: true},
    dimension: {type: String, required: true},
    type: {type: String, required: true},
};
const MongoPracticeMetricSchema = new Schema(mongoPracticeMetricSchema);


export interface IMongoPractice {
    dateCreated: Date,
    dateModified?: Date,
    description: string,
    name: string,
    userId: ObjectID,
    magistralDirections: ObjectID[],
    metrics: IMongoPracticeMetric[],
}

export interface IMongoPracticeDocument extends IMongoPractice, Document {
}

const mongoPracticeSchema: WithKeys<IMongoPractice> = {
    dateCreated: {type: Date, required: true},
    dateModified: {type: Date},
    description: {type: String, default: ""},
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    magistralDirections: [Schema.Types.ObjectId],
    metrics: [MongoPracticeMetricSchema],
};
const MongoPracticeSchema = new Schema(mongoPracticeSchema);

export const MongoPracticeCollection: Model<IMongoPracticeDocument> = model<IMongoPracticeDocument>('MongoPractice', MongoPracticeSchema);
