/**
 * @file firebird.ts
 * @description Firebird SQL 数据库数据类型定义
 *
 * 本文件定义了 Firebird SQL 数据库支持的所有数据类型。
 * 按类型分组：整数、浮点数、字符串、二进制、时间。
 * Firebird 的数据类型较为精简，但覆盖了大多数常用场景。
 * 支持 SMALLINT、INTEGER、BIGINT、DECIMAL、VARCHAR 等类型。
 *
 * @module common/data-types/firebird
 */
import { TypesGroup } from 'common/interfaces/antares';

export default [
   {
      group: 'integer',
      types: [
         {
            name: 'SMALLINT',
            length: false,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'INTEGER',
            length: false,
            collation: false,
            unsigned: true,
            zerofill: true
         },
         {
            name: 'BIGINT',
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
            name: 'DECIMAL',
            length: true,
            scale: true,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'NUMERIC',
            length: true,
            scale: true,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'FLOAT',
            length: false,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'DOUBLE PRECISION',
            length: false,
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
            name: 'BLOB-TEXT',
            length: false,
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
            length: false,
            collation: false,
            unsigned: false,
            zerofill: false
         },
         {
            name: 'CHAR-BINARY',
            length: false,
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
            name: 'TIMESTAMP',
            length: false,
            collation: false,
            unsigned: false,
            zerofill: false
         }
      ]
   }
] as TypesGroup[];
