import {Schema} from 'mongoose';

export interface IMagistralDirectionData {
    descrption: string,
    name: string,
}

export interface IMagistralDirection extends IMagistralDirectionData{
    dateCreated: Date,
    dateModified: Date,
    userId: Schema.Types.ObjectId,
}
