import {Document, model, Model, Schema} from 'mongoose';
import {IMagistralDirection} from '../interface/magistral-direction';

export interface IMagistralDirectionModel extends IMagistralDirection, Document {
}

const MagistralDirectionItemSchema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date},
    descrption: {type: String},
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
});

export const MagistralDirection: Model<IMagistralDirectionModel> = model<IMagistralDirectionModel>('MagistralDirection', MagistralDirectionItemSchema);
