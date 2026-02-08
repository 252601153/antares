/**
 * @file bufferToBase64.ts
 * @description Buffer 转 Base64 工具
 *
 * 本文件提供将 Buffer 数据转换为 Base64 字符串的功能。
 * 主要用于二进制数据的编码显示。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/libs/bufferToBase64
 */
export function bufferToBase64 (buf: Buffer) {
   const binstr = Array.prototype.map.call(buf, (ch: number) => {
      return String.fromCharCode(ch);
   }).join('');
   return Buffer.from(binstr, 'binary').toString('base64');
}
