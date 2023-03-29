## For example:

```
export class AppRepository extends BaseRepository<
  AppDocument,
  CreateDto,
  UpdateDto
> {
  constructor(
    @InjectModel(App.name)
    private _appModel: Model<AppDocument>,
  ) {
    super(_appModel);
  }
}
```
