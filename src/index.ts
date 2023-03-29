import { Document, Model } from "mongoose";

export class BaseRepository<T extends Document<T>, C, U> {
  constructor(private readonly _model: Model<T>) {}

  async create(data: C, existed?: [keyof C], user?: string): Promise<T | null> {
    try {
      if (existed && existed.length > 0) {
        const filter: any = {};
        for (const field of existed) {
          filter[field] = data[field];
        }

        const isExisted = await this._model.findOne(filter);
        if (isExisted) {
          throw new Error("FIELD IS EXISTED");
        }
      }
      return await this._model.create(data);
    } catch (err) {
      throw err;
    }
  }
  async findOne(input: Record<keyof T, any> | any): Promise<T | null> {
    try {
      return await this._model.findOne(input);
    } catch (err) {
      throw err;
    }
  }

  async findAll(
    input: Record<keyof T, any> | any,
    limit = 10 as number,
    offset = 0 as number,
    sort = { createdAt: -1 } as Record<keyof T, unknown> | any
  ): Promise<T[]> {
    try {
      return await this._model
        .find(input)
        .limit(limit)
        .skip(offset)
        .sort(sort)
        .sort({ _id: -1 });
    } catch (err) {
      throw err;
    }
  }

  async updateOne(
    filter: Record<keyof T, any> | any,
    input: U | any
  ): Promise<T | unknown> {
    try {
      return await this._model.findOneAndUpdate(filter, input, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(filter: Record<keyof T, any>): Promise<void> {
    try {
      await this._model.findOneAndDelete(filter);
      return;
    } catch (err) {
      throw err;
    }
  }

  async deleteMany(filter: [Record<keyof T, any>]): Promise<void> {
    try {
      await this._model.deleteMany(filter);
      return;
    } catch (err) {
      throw err;
    }
  }

  async count(filter: Record<keyof T, any>, pipe = []): Promise<number> {
    const [result] = await this._model.aggregate([
      {
        $match: {
          $and: [filter],
        },
      },
      ...pipe,
      { $count: "count" },
    ]);
    return result ? result.count : 0;
  }
}
