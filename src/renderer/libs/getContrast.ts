/**
 * @file getContrast.ts
 * @description 获取对比色工具
 *
 * 本文件提供根据背景色获取合适前景色的功能。
 * 用于确保文本可读性。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/libs/getContrast
 */
export const getContrast = (hexcolor: string) => {
   if (!hexcolor) return '';
   return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff / 2) ? 'dark' : 'light';
};
