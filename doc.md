# Array

## 1、查找数组下标

### _.findIndex

> _.findIndex(array, [predicate=_.identity], [fromIndex=0])
参数
array (Array): 要搜索的数组。
[predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
[fromIndex=0] (number): The index to search from.
返回值
(number): 返回找到元素的 索引值（index），否则返回 -1。

``` js

_.findIndex(array, [predicate=_.identity], [fromIndex=0])

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

### _.findLastIndex

> _.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
这个方式类似_.findIndex， 区别是它是从右到左的迭代集合array中的元素。
参数
array (Array): 要搜索的数组。
[predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
[fromIndex=array.length-1] (number): The index to search from.
返回值
(number): 返回找到元素的 索引值（index），否则返回 -1。

``` js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
 
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2
 
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```

## 数组去重

### _.uniq(array)

> _.uniq(array) 创建一个去重后的array数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。
参数
array (Array): 要检查的数组。
返回
(Array): 返回新的去重后的数组。

``` js
_.uniq([2, 1, 2]);
// => [2, 1]
```

### _.uniqBy

> _.uniqBy(array, [iteratee=_.identity]) 这个方法类似_.uniq ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：(value)。
参数
array (Array): 要检查的数组。
[iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。
返回
(Array): 返回新的去重后的数组。

``` js
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

### _.uniqWith

> _.uniqWith(array, [comparator])
这个方法类似_.uniq， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。
参数
array (Array): 要检查的数组。
[comparator] (Function): 比较函数，调用每个元素。
返回
(Array): 返回新的去重后的数组。

``` js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```

# Collection

## 遍历集合 _.forEach

> _.forEach(collection, [iteratee=_.identity]) 调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。
别名
_.each

参数
collection (Array|Object): 一个用来迭代的集合。
[iteratee=_.identity] (Function): 每次迭代调用的函数。
返回
(*): 返回集合 collection。

``` js
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => Logs `1` then `2`.

_.forEach([{val:'a', flag: true}, {val:'b', flag: true}, {val:'c', flag: false},{val:'d', flag: true}], function(item, idx) {
  console.log(idx)
  if(!item.flag) {
    console.log(item.val)
    return false
  }
})
// 0, 1, 2 c
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```

## _.forEachRight

> _.forEachRight(collection, [iteratee=_.identity])
这个方法类似_.forEach，不同之处在于， _.forEachRight 是从右到左遍历集合中每一个元素的。
别名
_.eachRight

参数
collection (Array|Object): 一个用来迭代的集合。
[iteratee=_.identity] (Function): 每次迭代调用的函数。
返回
(*): 返回集合 collection。

``` js
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => Logs `2` then `1`.
```

## _.groupBy

> _.groupBy(collection, [iteratee=_.identity])
创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
参数
collection (Array|Object): 一个用来迭代的集合。
[iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。
返回
(Object): 返回一个组成聚合的对象。

``` js
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
 
 _.groupBy([{ type: 'a', val: '1' }, { type: 'a', val: '2' }, { type: 'b', val: '1' }, { type: 'b', val: '2' }, {type: 'b', val: '3'}], 'type')
/* {
  a: [ { type: 'a', val: '1' }, { type: 'a', val: '2' } ],
  b: [
    { type: 'b', val: '1' },
    { type: 'b', val: '2' },
    { type: 'b', val: '3' }
  ]
}
*/

// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

## _.orderBy

> _.orderBy(collection, [iteratees=[_.identity]], [orders])
此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。
参数
collection (Array|Object): 用来迭代的集合。
[iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[]): 排序的迭代函数。
[orders] (string[]): iteratees迭代函数的排序顺序。
返回
(Array): 排序排序后的新数组。

``` js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

## _.sample(collection)

> 从collection（集合）中获得一个随机元素。
参数
collection (Array|Object): 要取样的集合。
返回
(*): 返回随机元素。

``` js
_.sample([1, 2, 3, 4]);
// => 2
```

## _.sampleSize(collection, [n=1])

> 从collection（集合）中获得 n 个随机元素。
参数
collection (Array|Object): 要取样的集合。
[n=1] (number): 取样的元素个数。
返回
(Array): 返回随机元素。

``` js
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
 
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```

## _.shuffle(collection)

> 创建一个被打乱值的集合
参数
collection (Array|Object): 要打乱的集合。
返回
(Array): 返回打乱的新数组。

``` js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

## _.size(collection)
>
> 返回collection（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。
参数
collection (Array|Object): 要检查的集合
返回
(number): 返回集合的长度。

``` js
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
```

## _.sortBy
>
> _.sortBy(collection, [iteratees=[_.identity]])
创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)
参数
collection (Array|Object): 用来迭代的集合。
[iteratees=[_.identity]] (...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])): 这个函数决定排序。
返回
(Array): 返回排序后的数组。

``` js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, function(o) { return o.user; });
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 
_.sortBy(users, 'user', function(o) {
  return Math.floor(o.age / 10);
});
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

# Function

## _.debounce

> _.debounce(func, [wait=0], [options={}])
创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。
注意: 如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。
如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。
参数
func (Function): 要防抖动的函数。
[wait=0] (number): 需要延迟的毫秒数。
[options={}] (Object): 选项对象。
[options.leading=false] (boolean): 指定在延迟开始前调用。
[options.maxWait] (number): 设置 func 允许被延迟的最大值。
[options.trailing=true] (boolean): 指定在延迟结束后调用。
返回
(Function): 返回新的 debounced（防抖动）函数。

``` js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```

## _.throttle

> 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。
注意: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。
如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。
参数
func (Function): 要节流的函数。
[wait=0] (number): 需要节流的毫秒。
[options={}] (Object): 选项对象。
[options.leading=true] (boolean): 指定调用在节流开始前。
[options.trailing=true] (boolean): 指定调用在节流结束后。
返回
(Function): 返回节流的函数。

``` js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

## _.memoize
>
> _.memoize(func, [resolver])
创建一个会缓存 func 结果的函数。 如果提供了 resolver ，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。 func 在调用时 this 会绑定在缓存函数上。
注意:缓存会暴露在缓存函数的 cache 上。它是可以定制的，只要替换了_.memoize.Cache 构造函数，或实现了 Map 的 delete, get, has, 和 set方法。
参数
func (Function): 需要缓存化的函数.
[resolver] (Function): 这个函数的返回值作为缓存的 key。
返回
(Function): 返回缓存化后的函数。

``` js
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// 修改结果缓存。
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// 替换 `_.memoize.Cache`。
_.memoize.Cache = WeakMap;
```

## _.cloneDeep

> _.cloneDeep(value) 这个方法类似_.clone，除了它会递归拷贝 value。（注：也叫深拷贝）。
参数
value (_): 要深拷贝的值。
返回
(_): 返回拷贝后的值。

``` js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

## _.merge(object, [sources])
>
> 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为undefined的sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。
Note: 这方法会改变对象 object.
参数
object (Object): 目标对象。
[sources] (...Object): 来源对象。
返回
(Object): 返回 object.

``` js
var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};
 
var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};
 
_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```

## _.omit

> _.omit(object, [props]) 反向版_.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。（愚人码头注：可以理解为删除object对象的属性）。
参数
object (Object): 来源对象。
[props] (...(string|string[])): 要被忽略的属性。（愚人码头注：单独指定或指定在数组中。）
返回
(Object): 返回新对象。

``` js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```

## _.pick

> _.pick(object, [props])
创建一个从 object 中选中的属性的对象。
参数
object (Object): 来源对象。
[props] (...(string|string[])): 要被挑选的属性。（注：单独指定或指定在数组中。）
返回
(Object): 返回新对象。

``` js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

## _.get

> _.get(object, path, [defaultValue])
根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
参数
object (Object): 要检索的对象。
path (Array|string): 要获取属性的路径。
[defaultValue] (_): 如果解析值是 undefined ，这值会被返回。
返回
(_): 返回解析的值。

``` js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

## _.update

> _.update(object, path, updater) 该方法类似_.set，除了接受updater以生成要设置的值。使用 _.updateWith来自定义生成的新path。updater调用1个参数：(value)。
Note: 这个方法会改变 object。
参数
object (Object): 要修改的对象。
path (Array|string): 要设置属性的路径。
updater (Function): 用来生成设置值的函数。
返回
(Object): 返回 object 。

``` js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.update(object, 'a[0].b.c', function(n) { return n * n; });
console.log(object.a[0].b.c);
// => 9
 
_.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
console.log(object.x[0].y.z);
// => 0
```

## _.uniqueId

> _.uniqueId([prefix=''])
生成唯一ID。 如果提供了 prefix ，会被添加到ID前缀上。
参数
[prefix=''] (string): 要添加到ID前缀的值。
返回
(string): 返回唯一ID。

``` js
_.uniqueId('contact_');
// => 'contact_104'
 
_.uniqueId();
// => '105'
```

## _.template

> _.template([string=''], [options={}]) 创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖_.templateSettings 的值
参数
[string=''] (string): 模板字符串.
[options={}] (Object): 选项对象.
[options.escape=_.templateSettings.escape] (RegExp): "escape" 分隔符.
[options.evaluate=_.templateSettings.evaluate] (RegExp): "evaluate" 分隔符.
[options.imports=_.templateSettings.imports] (Object): 导入对象到模板中作为自由变量。
[options.interpolate=_.templateSettings.interpolate] (RegExp): "interpolate" 分隔符。
[options.sourceURL='lodash.templateSources[n]'] (string): 模板编译的来源URL。
[options.variable='obj'] (string): 数据对象的变量名。
返回
(Function): 返回编译模板函数。

``` js
// 使用 "interpolate" 分隔符创建编译模板
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'

var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'
 
// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'
 
// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'
 
// 使用反斜杠符号作为纯文本处理
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'
```
