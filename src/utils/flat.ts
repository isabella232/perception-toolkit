/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * The flat() method creates a new array with all sub-array elements concatenated into it.
 * Unlike Array.prototoype.flat, does not support recursively flattening up to the specified depth.
 */
function flatPolyfill<U>(arr: any[], depth?: number): any[] {
  // As Per: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  // flat() is equivalent to:
  const flatOnce = (arr: any[]) => arr.reduce((acc, val) => acc.concat(val), []);
  let ret = flatOnce(arr);

  // This will iteratively flatten, depth number of times.
  if (depth) {
    for (let i = 1; i < depth; i++) {
      ret = flatOnce(ret);
    }
  }
  return ret;
}

export function flat<U>(arr: any[], depth?: number): any[] {
  if ('flat' in Array.prototype) {
    // ts-ignore used to pass karma tests.  TS complains flat() is not defined, even though we are feature detecting.
    // @ts-ignore
    return arr.flat(depth);
  } else {
    return flatPolyfill(arr);
  }
}
