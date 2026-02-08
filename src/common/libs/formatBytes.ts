/**
 * @file formatBytes.ts
 * @description 字节格式化工具
 *
 * 本文件提供将字节数转换为可读格式的功能。
 * 如 1024 转换为 "1 KB"。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/libs/formatBytes
 */
export function formatBytes (bytes: number, decimals = 2) {
   if (bytes === 0) return '0 Bytes';

   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
