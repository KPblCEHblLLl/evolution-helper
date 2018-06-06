import {model, Schema} from 'mongoose';

const MagistralDirectionItem = new Schema({
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date},
    descrption: {type: String},
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
});

export const MagistralDirectionItemModel = model('MagistralDirectionItem', MagistralDirectionItem)
