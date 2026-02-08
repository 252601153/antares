/**
 * @file mysql.ts
 * @description MySQL/MariaDB 数据库自定义配置
 *
 * 本文件定义了 MySQL 和 MariaDB 数据库特有的配置项。
 * 包括默认端口（3306）、默认用户（root）、数据类型、索引类型、
 * 外键操作、支持的功能（存储过程、函数、触发器、调度器等）。
 * 是最完整的数据库配置之一，支持大部分高级功能。
 *
 * @module common/customizations/mysql
 */
import mysqlTypes from '../data-types/mysql';
import { Customizations } from '../interfaces/customizations';
import { defaults } from './defaults';

export const customizations: Customizations = {
   ...defaults,
   // Defaults
   defaultPort: 3306,
   defaultUser: 'root',
   defaultDatabase: null,
   dataTypes: mysqlTypes,
   operators: ['=', '!=', '>', '<', '>=', '<=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE', 'RLIKE', 'NOT RLIKE', 'BETWEEN', 'IS NULL', 'IS NOT NULL'],
   indexTypes: [
      'PRIMARY',
      'INDEX',
      'UNIQUE',
      'FULLTEXT'
   ],
   foreignActions: [
      'RESTRICT',
      'CASCADE',
      'SET NULL',
      'NO ACTION'
   ],
   // Core
   connectionSchema: true,
   collations: true,
   engines: true,
   sslConnection: true,
   sshConnection: true,
   cancelQueries: true,
   singleConnectionMode: true,
   // Tools
   processesList: true,
   // Structure
   schemas: true,
   tables: true,
   views: true,
   triggers: true,
   routines: true,
   functions: true,
   schedulers: true,
   // Settings
   elementsWrapper: '`',
   stringsWrapper: '"',
   tableAdd: true,
   tableTruncateDisableFKCheck: true,
   tableDuplicate: true,
   tableDdl: true,
   tableCheck: true,
   viewAdd: true,
   triggerAdd: true,
   routineAdd: true,
   functionAdd: true,
   schedulerAdd: true,
   schemaEdit: true,
   schemaDrop: true,
   schemaExport: true,
   exportByChunks: true,
   schemaImport: true,
   tableSettings: true,
   viewSettings: true,
   triggerSettings: true,
   routineSettings: true,
   functionSettings: true,
   schedulerSettings: true,
   indexes: true,
   foreigns: true,
   sortableFields: true,
   unsigned: true,
   nullable: true,
   zerofill: true,
   autoIncrement: true,
   comment: true,
   collation: true,
   definer: true,
   onUpdate: true,
   viewAlgorithm: true,
   viewSqlSecurity: true,
   viewUpdateOption: true,
   procedureDeterministic: true,
   procedureDataAccess: true,
   procedureSql: 'BEGIN\r\n\r\nEND',
   procedureContext: true,
   procedureContextValues: ['IN', 'OUT', 'INOUT'],
   triggerSql: 'BEGIN\r\n\r\nEND',
   functionDeterministic: true,
   functionDataAccess: true,
   functionSql: 'BEGIN\r\n\r\nEND',
   parametersLength: true,
   readOnlyMode: true
};
