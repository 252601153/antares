/**
 * @file sqlite.ts
 * @description SQLite 数据库自定义配置
 *
 * 本文件定义了 SQLite 数据库特有的配置项。
 * SQLite 是轻量级文件数据库，支持的功能较精简。
 * 配置包括文件连接模式、表/视图/触发器支持、
 * 索引和外键设置等基础功能。
 *
 * @module common/customizations/sqlite
 */
import sqliteTypes from '../data-types/sqlite';
import { Customizations } from '../interfaces/customizations';
import { defaults } from './defaults';

export const customizations: Customizations = {
   ...defaults,
   dataTypes: sqliteTypes,
   indexTypes: [
      'PRIMARY',
      'INDEX',
      'UNIQUE'
   ],
   foreignActions: [
      'RESTRICT',
      'CASCADE',
      'SET NULL',
      'NO ACTION'
   ],
   // Core
   fileConnection: true,
   // Structure
   schemas: false,
   tables: true,
   views: true,
   triggers: true,
   // Settings
   elementsWrapper: '"',
   stringsWrapper: '\'',
   tableAdd: true,
   tableDuplicate: true,
   viewAdd: true,
   triggerAdd: true,
   schemaEdit: false,
   tableSettings: true,
   tableRealCount: true,
   viewSettings: true,
   triggerSettings: true,
   indexes: true,
   foreigns: true,
   sortableFields: true,
   nullable: true,
   nullablePrimary: true,
   triggerSql: 'BEGIN\r\n\r\nEND',
   readOnlyMode: true
};
