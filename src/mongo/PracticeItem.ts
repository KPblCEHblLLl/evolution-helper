import {Document, model, Model, Schema} from 'mongoose';
import {IPractice, IPracticeMetric} from "../interface/practice";

export interface IPracticeMetcicModel extends IPracticeMetric, Document {
}

const PracticeMetcicItemSchema = new Schema({
    description: {type: String},
    name: {type: String, required: true},
    dimension: {type: String, required: true},
});
export const PracticeMetric: Model<IPracticeMetcicModel> = model<IPracticeMetcicModel>('PracticeMetric', PracticeMetcicItemSchema);


export interface IPracticeModel extends IPractice, Document {
}

const PracticeItemSchema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date},
    description: {type: String},
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    metrics: [PracticeMetcicItemSchema],
});

export const Practice: Model<IPracticeModel> = model<IPracticeModel>('Practice', PracticeItemSchema);
