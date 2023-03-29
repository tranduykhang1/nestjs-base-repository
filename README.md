### Goals:

- The purpose of this package is support to define a simple CRUD Rest API quickly.

### Examples:

- FindAll `(offset, limt, {createdAt: 'desc'})`

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
