import {Document, model, Model, Schema} from 'mongoose';
import {ObjectID} from "bson";
import {WithKeys} from "../../util/WithKeys";

export interface IMongoMagistralDirection {
    name: string
    description: string

    dateCreated: Date
    dateModified?: Date
    userId: ObjectID
}

export interface IMongoMagistralDirectionDocument extends IMongoMagistralDirection, Document {
}

const magistralDirectionSchema: WithKeys<IMongoMagistralDirection> = {
    name: {type: String, required: true},
    description: {type: String, default: ""},

    dateCreated: {type: Date, required: true},
    dateModified: {type: Date},
    userId: {type: Schema.Types.ObjectId, required: true},
};
const MagistralDirectionSchema = new Schema(magistralDirectionSchema);

export const MongoMagistralDirectionCollection: Model<IMongoMagistralDirectionDocument> = model<IMongoMagistralDirectionDocument>('MagistralDirection', MagistralDirectionSchema);
