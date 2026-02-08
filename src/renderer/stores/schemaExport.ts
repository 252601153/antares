/**
 * @file schemaExport.ts
 * @description 模式导出状态 Store
 *
 * 本文件使用 Pinia 管理数据库导出功能的状态。
 * 包括导出进度、导出配置等。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/stores/schemaExport
 */
import { defineStore } from 'pinia';

export const useSchemaExportStore = defineStore('schemaExport', {
   state: () => ({
      isExportModal: false,
      selectedTable: undefined as undefined | string,
      selectedSchema: undefined as undefined | string
   }),
   actions: {
      showExportModal (schema?: string, table?: string) {
         this.selectedTable = table;
         this.selectedSchema = schema;
         this.isExportModal = true;
      },
      hideExportModal () {
         this.isExportModal = false;
         this.selectedTable = undefined;
         this.selectedSchema = undefined;
      }
   }
});
