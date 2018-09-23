import {Response} from "express";

export interface IJsonResponse<T> extends Response {
    status: (status: number) => IJsonResponse<T>;
    send: (body : T | null | undefined) => IJsonResponse<T>;
}
