"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
var BaseRepository = /** @class */ (function () {
    function BaseRepository(_model) {
        this._model = _model;
    }
    BaseRepository.prototype.create = function (data, existed) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, _i, existed_1, field, isExisted, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(existed && existed.length > 0)) return [3 /*break*/, 2];
                        filter = {};
                        for (_i = 0, existed_1 = existed; _i < existed_1.length; _i++) {
                            field = existed_1[_i];
                            filter[field] = data[field];
                        }
                        return [4 /*yield*/, this._model.findOne(filter)];
                    case 1:
                        isExisted = _a.sent();
                        if (isExisted) {
                            throw new Error("FIELD IS EXISTED");
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._model.create(data)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.findOne = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._model.findOne(input)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.findAll = function (_a) {
        var _b = _a.filter, filter = _b === void 0 ? {} : _b, _c = _a.paginating, paginating = _c === void 0 ? {} : _c, _d = _a.populate, populate = _d === void 0 ? [] : _d;
        return __awaiter(this, void 0, void 0, function () {
            var sortField, sortOrder, _e, offset, _f, limit, query;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        sortField = paginating.sortField, sortOrder = paginating.sortOrder, _e = paginating.offset, offset = _e === void 0 ? 0 : _e, _f = paginating.limit, limit = _f === void 0 ? 10 : _f;
                        query = this._model
                            .find(filter)
                            .limit(limit)
                            .skip(offset)
                            .sort((_g = {}, _g[sortField] = sortOrder, _g));
                        if (populate) {
                            query.populate(populate);
                        }
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, _h.sent()];
                }
            });
        });
    };
    BaseRepository.prototype.paginatedAggregate = function (filter, _a, pipes) {
        var sortOrder = _a.sortOrder, sortField = _a.sortField, offset = _a.offset, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var findPipes, data;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        findPipes = __spreadArray([], pipes, true);
                        if (offset && limit > 0) {
                            findPipes = __spreadArray(__spreadArray([], findPipes, true), [
                                {
                                    $skip: offset,
                                },
                                {
                                    $limit: offset + limit,
                                },
                            ], false);
                        }
                        return [4 /*yield*/, this._model.aggregate(__spreadArray([
                                {
                                    $match: { $and: filter },
                                },
                                {
                                    $sort: (_b = {},
                                        _b[sortField] = sortOrder,
                                        _b._id = sortOrder,
                                        _b),
                                }
                            ], findPipes, true))];
                    case 1:
                        data = _c.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    BaseRepository.prototype.updateOne = function (filter, input) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._model.findOneAndUpdate(filter, input, { new: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.updateMany = function (filter, input) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._model.updateMany(filter, input, { new: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.deleteOne = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._model.findOneAndDelete(filter)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.deleteMany = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._model.deleteMany(filter)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        err_6 = _a.sent();
                        throw err_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.count = function (filter, pipe) {
        if (pipe === void 0) { pipe = []; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.aggregate(__spreadArray(__spreadArray([
                            {
                                $match: {
                                    $and: [filter],
                                },
                            }
                        ], pipe, true), [
                            { $count: "count" },
                        ], false))];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result ? result.count : 0];
                }
            });
        });
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
