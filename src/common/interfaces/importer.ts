/**
 * @file importer.ts
 * @description 数据导入接口定义
 *
 * 本文件定义了数据导入功能相关的接口。
 * 包括导入选项、导入结果等类型定义。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/interfaces/importer
 */
import * as antares from './antares';

export interface ImportOptions {
   uid: string;
   schema: string;
   type: antares.ClientCode;
   file: string;
}

export interface ImportState {
   fileSize?: number;
   readPosition?: number;
   percentage?: number;
   queryCount?: number;
   op?: string;
}
