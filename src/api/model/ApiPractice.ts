import {ObjectID} from "bson";
import {IMongoPracticeDocument} from "../mongo/MongoPracticeCollection";
import {IApiPracticeMetric, parseMongoSubdocumentToApiPracticeMetric} from "./ApiPracticeMetric";
import {
    IApiMagistralDirectionClassif,
    parseMongoDocumentToApiMagistralDirectionClassif
} from "./ApiMagistralDirectionClassif";
import {MongoMagistralDirectionCollection} from "../mongo/MongoMagistralDirectionCollection";

export interface IApiPractice {
    id: ObjectID,
    description: string,
    name: string,
    magistralDirections: IApiMagistralDirectionClassif[],
    metrics: IApiPracticeMetric[],
}

export function parseMongoDocumentToApiPractice(
    model: IMongoPracticeDocument,
): Promise<IApiPractice> {
    return MongoMagistralDirectionCollection.find({_id: {$in: model.magistralDirections}}).then((list) => {
        return {
            description: model.description,
                name: model.name,
            magistralDirections: list
                .filter(x => model.magistralDirections.indexOf(x._id) !== -1)
                .map(parseMongoDocumentToApiMagistralDirectionClassif),
            metrics: model.metrics.map(parseMongoSubdocumentToApiPracticeMetric),
            id: model.id,
        }
    })
}
