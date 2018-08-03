import {Schema} from 'mongoose';

export interface IMagistralDirectionData {
    description: string,
    name: string,
}

export interface IMagistralDirection extends IMagistralDirectionData{
    dateCreated: Date,
    dateModified: Date,
    userId: Schema.Types.ObjectId,
}
