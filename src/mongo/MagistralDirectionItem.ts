import {Schema, model} from 'mongoose';
import {ObjectID} from 'mongodb';

const MagistralDirectionItem = new Schema({
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date},
    descrption: {type: String},
    name: {type: String, required: true},
    userId: {type: ObjectID, required: true},
});

export const  MagistralDirectionItemModel = model('MagistralDirectionItem', MagistralDirectionItem)