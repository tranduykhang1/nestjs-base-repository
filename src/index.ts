import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  PopulateOption,
} from "mongoose";

export class BaseRepository<T extends Document<T>, C, U> {
  constructor(private readonly _model: Model<T>) {}

  async create(data: C, existed?: [keyof C]): Promise<T | null> {
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

  async findOne(input: FilterQuery<T> | any): Promise<T | null> {
    try {
      return await this._model.findOne(input);
    } catch (err) {
      throw err;
    }
  }

  async findAll({
    filter = {},
    paginating = {},
    populate = [],
  }: {
    filter: FilterQuery<T>;
    paginating: any;
    populate: Array<PopulateOption> | any;
  }): Promise<Array<T>> {
    const { sortField, sortOrder, offset = 0, limit = 10 } = paginating;

    try {
      const query = this._model
        .find(filter)
        .limit(limit)
        .skip(offset)
        .sort({ [sortField]: sortOrder });

      if (populate) {
        query.populate(populate);
      }
      return await query;
    } catch (err) {
      throw err;
    }
  }

  async paginatedAggregate<R = T>(
    filter: Array<FilterQuery<T>>,
    {
      sortOrder,
      sortField,
      offset = 0,
      limit = 10,
    }: {
      sortOrder: string;
      sortField: string;
      offset?: number;
      limit?: number;
    },
    pipes?: Array<PipelineStage> | any
  ): Promise<Array<R>> {
    try {
      const data = await this._model.aggregate([
        {
          $match: { $and: filter },
        },
        {
          $sort: {
            [sortField]: sortOrder,
            _id: sortOrder,
          },
        },
        ...pipes,
        {
          $skip: offset,
        },
        {
          $limit: offset + limit,
        },
      ]);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateOne(
    filter: FilterQuery<T>,
    input: U | any
  ): Promise<T | unknown> {
    try {
      return await this._model.findOneAndUpdate(filter, input, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async updateMany(
    filter: FilterQuery<T>,
    input: U | any
  ): Promise<T | unknown> {
    try {
      return await this._model.updateMany(filter, input, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(filter: FilterQuery<T>): Promise<void> {
    try {
      await this._model.findOneAndDelete(filter);
      return;
    } catch (err) {
      throw err;
    }
  }

  async deleteMany(filter: FilterQuery<T>): Promise<void> {
    try {
      await this._model.deleteMany(filter);
      return;
    } catch (err) {
      throw err;
    }
  }

  async count(filter: Record<keyof T, any>, pipe = []): Promise<number> {
    try {
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
    } catch (err) {
      throw err;
    }
  }
}
