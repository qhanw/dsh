dajun deng, [Aug 15, 2025 at 05:15:08]:
访问视频详情的时候 可以用 "UPDATE "+videoTableName+" SET browse=browse +1 WHERE id = ? RETURNING * 这个语句，然后可以通过browse做一个推荐页面，如果用户访问的资源不存在，就给他返回一个 推荐页面，，


我和他沟通咯下，目前你说的那个方式，只匹配老站的类型目录，资源级确实匹配不上，


目前这个方式ok的，


```js
<script>
var _czc = _czc || [];
(function () {
  var um = document.createElement("script");
  um.src = "https://v1.cnzz.com/z.js?id=1281430563&async=1";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(um, s);
})();
</script>
```


```go
func (r *VideoPg) List(ctx context.Context, limit int, offset int, keywords string, tagIds []int64) (int64, []Video, error) {
  pageBuild := builder.Dialect(config.GetDatabaseType())
  countBuild := builder.Dialect(config.GetDatabaseType())
  if len(tagIds) > 0 {
    pageBuild.Select(videoTableName+".*").From(videoTableName).
      LeftJoin(tagVideoTableName, videoTableName+".id="+tagVideoTableName+".video_id").OrderBy(videoTableName + ".period desc").
      Where(builder.Like{videoTableName + ".name", keywords}.
        Or(builder.Like{videoTableName + ".enname", keywords}).
        Or(builder.Like{videoTableName + ".introduction", keywords}).
        Or(builder.Like{videoTableName + ".directors", keywords}).
        Or(builder.Like{videoTableName + ".actors", keywords}).
        And(builder.In(tagVideoTableName+".tag_id", tagIds)).And(builder.Eq{videoTableName + ".status": true}))
    countBuild.Select("count(1) as count").From(videoTableName).
      LeftJoin(tagVideoTableName, videoTableName+".id="+tagVideoTableName+".video_id").
      Where(builder.Like{videoTableName + ".name", keywords}.
        Or(builder.Like{videoTableName + ".enname", keywords}).
        Or(builder.Like{videoTableName + ".introduction", keywords}).
        Or(builder.Like{videoTableName + ".directors", keywords}).
        Or(builder.Like{videoTableName + ".actors", keywords}).
        And(builder.In(tagVideoTableName+".tag_id", tagIds)).And(builder.Eq{videoTableName + ".status": true}))

  } else {
    pageBuild.Select(videoTableName+".*").From(videoTableName).OrderBy(videoTableName+".period desc").
      LeftJoin(tagVideoTableName, videoTableName+".id="+tagVideoTableName+".video_id").
      Where(builder.Like{videoTableName + ".name", keywords}.
        Or(builder.Like{videoTableName + ".enname", keywords}).
        Or(builder.Like{videoTableName + ".introduction", keywords}).
        Or(builder.Like{videoTableName + ".directors", keywords}).
        Or(builder.Like{videoTableName + ".actors", keywords}).
        And(builder.Eq{videoTableName + ".status": true}))
    countBuild.Select("count(1) as count").From(videoTableName).
      LeftJoin(tagVideoTableName, videoTableName+".id="+tagVideoTableName+".video_id").
      Where(builder.Like{videoTableName + ".name", keywords}.
        Or(builder.Like{videoTableName + ".enname", keywords}).
        Or(builder.Like{videoTableName + ".introduction", keywords}).
        Or(builder.Like{videoTableName + ".directors", keywords}).
        Or(builder.Like{videoTableName + ".actors", keywords}).
        And(builder.Eq{videoTableName + ".status": true}))
  }
  pageSql, err := pageBuild.Limit(limit, offset).ToBoundSQL()
  if err != nil {
    return 0, nil, errors.Wrapf(err, "VideoPg List builder:%v,%v,%v,%v", limit, offset, keywords, tagIds)
  }
  countSql, err := countBuild.ToBoundSQL()
  if err != nil {
    return 0, nil, errors.Wrapf(err, "VideoPg count builder:%v,%v", keywords, tagIds)
  }
  var count int64
  has, err := r.db.SQL(countSql).Get(&count)
  if err != nil || !has {
    return count, nil, errors.Wrapf(err, "sql%s Find %v", countSql, has)
  }
  var res []Video
  err = r.db.SQL(pageSql).Find(&res)
  if err != nil {
    return count, nil, errors.Wrapf(err, "sql%s Find", pageSql)
  }
  return count, res, nil
}
```