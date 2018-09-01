import {Schema} from 'mongoose';

export interface IMagistralDirectionData {
    name: string,
    description: string,
}

export interface IMagistralDirection extends IMagistralDirectionData{
    dateCreated: Date,
    dateModified: Date,
    userId: Schema.Types.ObjectId,
}
