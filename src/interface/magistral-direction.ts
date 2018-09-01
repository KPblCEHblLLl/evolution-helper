import {Schema} from 'mongoose';

export interface IMagistralDirectionUserData {
    name: string,
    description: string,
}


export interface IMagistralDirectionServiceData {
    dateCreated: Date,
    dateModified?: Date,
    userId: Schema.Types.ObjectId,
}

export interface IMagistralDirection extends IMagistralDirectionUserData, IMagistralDirectionServiceData{
}

const sample: IMagistralDirectionUserData = {
    description: "",
    name: "",
};

export const IMagistralDirectionUserDataKeys: Array<keyof IMagistralDirectionUserData> =  Object.keys(sample) as Array<keyof IMagistralDirectionUserData>;
