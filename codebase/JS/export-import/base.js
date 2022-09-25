/** @format */

// export individual features
export let name1, name2, nameN; // also var, const
export let name1 = 1,
  name2 = 2,
  nameN = "";
export function functionName() {}
export class ClassName {}

// export list
export { name1, name2, nameN };

// rename
export { name1 as variable1 };

// export destructed assignments with renaming
export const { name1, name2: bar } = o;

// Default export
export default expression;
export default function () {} // also class, function *
export default function name1() {} 
export { name1 as default }

// export some other modules, make it available to someone that import this module.
export * from 'bar.js'  // does not set the defualt export 
export * as name1 from 'foo.js' // draft ES 2021
export { name1, name2, nameN } from 'foo.js'

// they are like importing modules first and export them out
// but they do not become available inside the current module
import { default as function1, function2 } from 'bar.js';
export { function1 as default, function2 };

export { import as name1, import as name2 } from 'foo.js'
export { default } from 'foo.js'


// Default export can be import as any name

// file test.js
let k; export default k = 12;

// some other file
import m from './test'; // note that we have the freedom to use import m instead of import k, because k was default export
console.log(m);        // will log 12