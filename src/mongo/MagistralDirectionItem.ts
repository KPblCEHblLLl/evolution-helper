import {Document, Model, model, Schema} from 'mongoose';
import {IMagistralDirection} from "../models/MagistralDirection";

export interface IMagistralDirectionItem extends IMagistralDirection, Document {}

export const MagistralDirectionItemSchema: Schema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date},
    descrption: {type: String},
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
});

export const MagistralDirectionItem: Model<IMagistralDirectionItem> = model<IMagistralDirectionItem>('MagistralDirectionItem', MagistralDirectionItemSchema)
