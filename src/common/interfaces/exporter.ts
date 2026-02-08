/**
 * @file exporter.ts
 * @description 数据导出接口定义
 *
 * 本文件定义了数据导出功能相关的接口。
 * 包括导出选项、导出结果等类型定义。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/interfaces/exporter
 */
export interface TableParams {
   table: string;
   includeStructure: boolean;
   includeContent: boolean;
   includeDropStatement: boolean;
}

export interface ExportOptions {
   schema: string;
   tables: {
      table: string;
      includeStructure: boolean;
      includeContent: boolean;
      includeDropStatement: boolean;
   }[];
   includes: Record<string, boolean>;
   outputFormat: 'sql' | 'sql.zip';
   outputFile: string;
   sqlInsertAfter: number;
   sqlInsertDivider: 'bytes' | 'rows';
}

export interface ExportState {
   totalItems?: number;
   currentItemIndex?: number;
   currentItem?: string;
   op?: string;
}
