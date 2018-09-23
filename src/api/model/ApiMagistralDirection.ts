import {ObjectID} from "bson";
import {IMongoMagistralDirectionDocument} from "../mongo/MongoMagistralDirectionCollection";

export interface IApiMagistralDirection {
    id: ObjectID,
    name: string,
    description: string,
}

export function parseMongoDocumentToApiMagistralDirection (model: IMongoMagistralDirectionDocument): IApiMagistralDirection {
    return {
        id: model.id,
        description: model.description,
        name: model.name,
    }
}
