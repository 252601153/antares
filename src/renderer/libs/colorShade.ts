/**
 * @file colorShade.ts
 * @description 颜色明暗调整工具
 *
 * 本文件提供调整颜色明暗度的功能。
 * 用于根据基础颜色生成变体色。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/libs/colorShade
 */
export const colorShade = (color: string, amount: number) => {
   color = color.replaceAll('#', '');
   if (color.length === 3) color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   let [r, g, b] = color.match(/.{2}/g) as any;
   ([r, g, b] = [parseInt(r, 16) + amount, parseInt(g, 16) + amount, parseInt(b, 16) + amount]);

   r = Math.max(Math.min(255, r), 0).toString(16);
   g = Math.max(Math.min(255, g), 0).toString(16);
   b = Math.max(Math.min(255, b), 0).toString(16);

   const rr = (r.length < 2 ? '0' : '') + r;
   const gg = (g.length < 2 ? '0' : '') + g;
   const bb = (b.length < 2 ? '0' : '') + b;

   return `#${rr}${gg}${bb}`;
};
