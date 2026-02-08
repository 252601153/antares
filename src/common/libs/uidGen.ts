/**
 * @file uidGen.ts
 * @description 唯一 ID 生成器
 *
 * 本文件提供生成唯一标识符的功能。
 * 用于连接、标签页等对象的唯一标识。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/libs/uidGen
 */
export function uidGen (prefix?: string) {
   return (prefix ? `${prefix}:` : '') + Math.random().toString(36).substring(2, 11).toUpperCase();
}
