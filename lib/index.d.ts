/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, FilterQuery, Model, PipelineStage, PopulateOption } from "mongoose";
export declare class BaseRepository<T extends Document<T>, C, U> {
    private readonly _model;
    constructor(_model: Model<T>);
    create(data: C, existed?: [keyof C]): Promise<T | null>;
    findOne(input: FilterQuery<T> | any): Promise<T | null>;
    findAll({ filter, paginating, populate, }: {
        filter: FilterQuery<T>;
        paginating: any;
        populate: Array<PopulateOption> | any;
    }): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>[]>;
    paginatedAggregate<R = T>(filter: Array<FilterQuery<T>>, { sortOrder, sortField, offset, limit, }: {
        sortOrder: string;
        sortField: string;
        offset: number;
        limit: number;
    }, pipes?: Array<PipelineStage> | any): Promise<Array<R>>;
    updateOne(filter: FilterQuery<T>, input: U | any): Promise<T | unknown>;
    updateMany(filter: FilterQuery<T>, input: U | any): Promise<T | unknown>;
    deleteOne(filter: FilterQuery<T>): Promise<void>;
    deleteMany(filter: FilterQuery<T>): Promise<void>;
    count(filter: Record<keyof T, any>, pipe?: never[]): Promise<number>;
}
