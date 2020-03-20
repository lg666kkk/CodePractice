const url = require('url')
let obj = url.parse('/pinglun?name=1111&message=111哇哇哇哇')
console.log(obj);
/*
Url {
  protocol: null,
  slashes: null, 
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=1111&message=111哇哇哇哇',
  query: 'name=1111&message=111哇哇哇哇',
  pathname: '/pinglun',
  path: '/pinglun?name=1111&message=111哇哇哇哇',
  href: '/pinglun?name=1111&message=111哇哇哇哇' }
*/
let obj1 = url.parse('/pinglun?name=1111&message=111哇哇哇哇',true)
console.log(obj1);
/*
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=1111&message=111哇哇哇哇',
  query:
   [Object: null prototype] { name: '1111', message: '111哇哇哇哇' },
  pathname: '/pinglun',
  path: '/pinglun?name=1111&message=111哇哇哇哇',
  href: '/pinglun?name=1111&message=111哇哇哇哇' }
*/
console.log(obj1.query);