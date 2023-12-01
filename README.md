### Goals:

-   The purpose of this package is support to define a simple CRUD Rest API quickly.

### Required:

-   >= @nestjs/mongoose@10.0.2
-   >= mongoose@8.0.1

### Supported methods:

-   create
-   findOne
-   findAll
-   paginatedAggregate
-   updateOne
-   deleteOne
-   deleteMany
-   count

### Usage:

```typescript
export class AppRepository extends BaseRepository<
    AppDocument,
    CreateDto,
    UpdateDto
> {
    constructor(
        @InjectModel(App.name)
        private _appModel: Model<AppDocument>
    ) {
        super(_appModel);
    }
}
```
