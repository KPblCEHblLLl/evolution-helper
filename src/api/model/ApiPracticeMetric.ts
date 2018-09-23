import {IMongoPracticeMetric} from "../mongo/MongoPracticeCollection";
import MetricDimension from "../../enum/MetricDimension";
import MetricType from "../../enum/MetricType";


export interface IApiPracticeMetric {
    name: string,
    description: string,
    dimension: keyof typeof MetricDimension,
    type: keyof typeof MetricType,
}

export function parseMongoSubdocumentToApiPracticeMetric(subdoc: IMongoPracticeMetric): IApiPracticeMetric {
    return {
        name: subdoc.name,
        description: subdoc.description,
        dimension: subdoc.dimension,
        type: subdoc.type,
    }
}
