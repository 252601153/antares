/**
 * @file camelize.ts
 * @description 驼峰命名转换工具
 *
 * 本文件提供字符串命名格式转换功能。
 * 将下划线命名转换为驼峰命名。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/libs/camelize
 */
export const camelize = (text: string) => {
   const textArr = text.split('-');
   for (let i = 0; i < textArr.length; i++) {
      if (i === 0) continue;
      textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1);
   }

   return textArr.join('');
};
