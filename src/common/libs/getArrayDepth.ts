/**
 * @file getArrayDepth.ts
 * @description 数组深度检测工具
 *
 * 本文件提供获取嵌套数组深度的功能。
 * 用于处理 PostgreSQL 数组类型字段。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/libs/getArrayDepth
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function getArrayDepth (array: any[]): number {
   return Array.isArray(array)
      ? 1 + Math.max(0, ...array.map(getArrayDepth))
      : 0;
}
