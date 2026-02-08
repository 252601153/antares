/**
 * @file sqlite.ts
 * @description SQLite 数据库数据类型定义
 *
 * 本文件定义了 SQLite 数据库支持的所有数据类型。
 * SQLite 采用动态类型系统，类型较为精简。
 * 按类型分组：整数、浮点数、字符串、二进制、时间、其他。
 * 包含 INTEGER、TEXT、BLOB、REAL、NUMERIC 等核心类型。
 *
 * @module common/data-types/sqlite
 */
import { TypesGroup } from 'common/interfaces/antares';

export default [
   {
      group: 'integer',
      types: [
         {
            name: 'INT',
            length: 10,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'INTEGER',
            length: true,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'INTEGER UNSIGNED',
            length: true,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'BIGINT',
            length: true,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'NUMERIC',
            length: true,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'BOOLEAN',
            length: false,
            collation: false,
            unsigned: true,
            zerofill: true
         }
      ]
   },
   {
      group: 'float',
      types: [
         {
            name: 'FLOAT',
            length: true,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'REAL',
            length: true,
            collation: false,
            unsigned: false,
            zerofill: false
         }
      ]
   },
   {
      group: 'string',
      types: [
         {
            name: 'CHAR',
            length: true,
            collation: true,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'VARCHAR',
            length: true,
            collation: true,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'TEXT',
            length: true,
            collation: true,
            unsigned: false,
            zerofill: false
         }
      ]
   },
   {
      group: 'binary',
      types: [
         {
            name: 'BLOB',
            length: true,
            collation: false,
            unsigned: false,
            zerofill: false
         }
      ]
   },
   {
      group: 'time',
      types: [
         {
            name: 'DATE',
            length: false,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'TIME',
            length: true,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'DATETIME',
            length: true,
            collation: false,
            unsigned: false,
            zerofill: false
         }
      ]
   },
   {
      group: 'other',
      types: [
         {
            name: 'NONE',
            length: false,
            collation: false,
            unsigned: false,
            zerofill: false
         }
      ]
   }
] as TypesGroup[];
