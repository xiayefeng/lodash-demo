const _ = require('lodash')

var users = [
  { 'user': 'barney', 'active': false },
  { 'user': 'fred', 'active': false },
  { 'user': 'pebbles', 'active': true }
];
console.log(_.findIndex(users, function (o) { return o.user == 'barney'; }))
console.log(_.findIndex(users, { active: false, user: 'fred' }))
console.log(_.findIndex(users, ['active', false]))
console.log(_.findIndex(users, 'active'))
var arr = _.dropWhile(users, function (o) { return !o.active; });
console.log(arr)
console.log(users)
const letters = ["a", "b", "c"];
const numbers = [1, 2, 3];

const alphaNumeric = letters.concat('d', numbers);
console.log(alphaNumeric)

_.forEach([{ val: 'a', flag: true }, { val: 'b', flag: true }, { val: 'c', flag: false }, { val: 'd', flag: true }], function (value, idx) {
  console.log(idx)
  if (!value.flag) {
    console.log(value.val)
    return false
  }
})

var arr = _.groupBy([{ type: 'a', val: '1' }, { type: 'a', val: '2' }, { type: 'b', val: '1' }, { type: 'b', val: '2' }, {type: 'b', val: '3'}], 'type')
console.log(arr)

var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
arr = _.sortBy(users, function(o) { return o.user; });
console.log(arr)

arr = _.sortBy(users, ['user', 'age']);
console.log(arr)

arr = _.sortBy(users, 'user', function(o) {
  return Math.floor(o.age / 10);
});
console.log(arr)

var compiled = _.template('<% print("hello " + user); %>!');
var str = compiled({ 'user': 'barney' });
console.log(str)

var compiled = _.template('hello ${ user }!');
var str = compiled({ 'user': 'pebbles' });
console.log(str)