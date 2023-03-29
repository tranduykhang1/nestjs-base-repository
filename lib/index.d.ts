import { Document, Model } from "mongoose";
export declare class BaseRepository<T extends Document<T>, C, U> {
    private readonly _model;
    constructor(_model: Model<T>);
    create(data: C, existed?: [keyof C], user?: string): Promise<T | null>;
    findOne(input: Record<keyof T, any> | any): Promise<T | null>;
    findAll(input: Record<keyof T, any> | any, limit?: number, offset?: number, sort?: any): Promise<T[]>;
    updateOne(filter: Record<keyof T, any> | any, input: U | any): Promise<T | unknown>;
    deleteOne(filter: Record<keyof T, any>): Promise<void>;
    deleteMany(filter: [Record<keyof T, any>]): Promise<void>;
    count(filter: Record<keyof T, any>, pipe?: never[]): Promise<number>;
}
