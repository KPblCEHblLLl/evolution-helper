import {Schema} from 'mongoose';

export interface IMagistralDirection {
    dateCreated: Date,
    dateModified: Date,
    descrption: string,
    name: string,
    userId: Schema.Types.ObjectId,
}
