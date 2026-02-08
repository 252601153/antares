/**
 * @file postgresql.ts
 * @description PostgreSQL 数据库自定义配置
 *
 * 本文件定义了 PostgreSQL 数据库特有的配置项。
 * 包括默认端口（5432）、默认用户（postgres）、默认数据库（postgres）、
 * 支持的功能（物化视图、触发器函数、多种语言等 PostgreSQL 特性）。
 * 支持数组类型、过程语言（plpgsql、SQL 等）。
 *
 * @module common/customizations/postgresql
 */
import postgresqlTypes from '../data-types/postgresql';
import { Customizations } from '../interfaces/customizations';
import { defaults } from './defaults';

export const customizations: Customizations = {
   ...defaults,
   // Defaults
   defaultPort: 5432,
   defaultUser: 'postgres',
   defaultDatabase: 'postgres',
   dataTypes: postgresqlTypes,
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
   database: true,
   sslConnection: true,
   sshConnection: true,
   cancelQueries: true,
   // Tools
   processesList: true,
   // Structure
   schemas: true,
   tables: true,
   views: true,
   materializedViews: true,
   triggers: true,
   triggerFunctions: true,
   routines: true,
   functions: true,
   // Misc
   elementsWrapper: '"',
   stringsWrapper: '\'',
   tableAdd: true,
   tableDuplicate: true,
   tableDdl: true,
   viewAdd: true,
   materializedViewAdd: true,
   triggerAdd: true,
   triggerFunctionAdd: true,
   routineAdd: true,
   functionAdd: true,
   schemaDrop: true,
   schemaExport: true,
   schemaImport: true,
   databaseEdit: false,
   tableSettings: true,
   viewSettings: true,
   materializedViewSettings: true,
   triggerSettings: true,
   triggerFunctionSettings: true,
   routineSettings: true,
   functionSettings: true,
   indexes: true,
   foreigns: true,
   nullable: true,
   comment: true,
   tableArray: true,
   procedureSql: '$procedure$\r\n\r\n$procedure$',
   procedureContext: true,
   procedureContextValues: ['IN', 'OUT', 'INOUT'],
   procedureLanguage: true,
   functionSql: '$function$\r\n\r\n$function$',
   triggerFunctionSql: '$function$\r\nBEGIN\r\n\r\nEND\r\n$function$',
   triggerFunctionlanguages: ['plpgsql'],
   functionContext: true,
   functionLanguage: true,
   triggerSql: 'EXECUTE PROCEDURE ',
   triggerStatementInCreation: true,
   triggerMultipleEvents: true,
   triggerTableInName: true,
   triggerOnlyRename: false,
   triggerEnableDisable: true,
   languages: ['sql', 'plpgsql', 'c', 'internal'],
   readOnlyMode: true
};
