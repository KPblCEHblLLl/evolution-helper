import {ObjectID} from "bson";
import {IMongoMagistralDirectionDocument} from "../mongo/MongoMagistralDirectionCollection";

export interface IApiMagistralDirectionClassif {
    id: ObjectID,
    name: string,
}

export function parseMongoDocumentToApiMagistralDirectionClassif (model: IMongoMagistralDirectionDocument): IApiMagistralDirectionClassif {
    return {
        id: model.id,
        name: model.name,
    }
}
