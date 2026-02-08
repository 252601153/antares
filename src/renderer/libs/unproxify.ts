/**
 * @file unproxify.ts
 * @description 解除 Vue 响应式代理
 *
 * 本文件提供将 Vue 响应式对象转换为普通对象的功能。
 * 用于向主进程传递数据时避免代理对象问题。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/libs/unproxify
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toRaw } from 'vue';

/**
 * @param {*} val
 * @param {Boolean} json converts the value in JSON object (default true)
 */
export function unproxify<T = any> (val: T, json = true): T {
   if (json)// JSON conversion
      return JSON.parse(JSON.stringify(val));
   else if (Array.isArray(val))// If array
      return toRaw(val);
   else if (typeof val === 'object') { // If object
      const result: any = {};
      for (const key in val)
         result[key] = toRaw(val[key]);

      return result;
   }
   else
      return toRaw(val);
}
