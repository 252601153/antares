/**
 * @file firebird.ts
 * @description Firebird SQL 数据库自定义配置
 *
 * 本文件定义了 Firebird SQL 数据库特有的配置项。
 * 包括默认端口（3050）、默认用户（SYSDBA）、
 * 支持的功能（表、视图、触发器、存储过程）。
 * Firebird 是一个关系型数据库，常用于嵌入式应用。
 *
 * @module common/customizations/firebird
 */
import firebirdTypes from '../data-types/firebird';
import { Customizations } from '../interfaces/customizations';
import { defaults } from './defaults';

export const customizations: Customizations = {
   ...defaults,
   // Defaults
   defaultPort: 3050,
   defaultUser: 'SYSDBA',
   defaultDatabase: null,
   dataTypes: firebirdTypes,
   indexTypes: [
      'PRIMARY',
      // 'CHECK',
      'UNIQUE'
   ],
   foreignActions: [
      'RESTRICT',
      'NO ACTION',
      'CASCADE',
      'SET NULL',
      'SET DEFAULT'
   ],
   // Core
   database: true,
   collations: false,
   engines: false,
   connectionSchema: false,
   sslConnection: false,
   sshConnection: false,
   fileConnection: false,
   cancelQueries: false,
   // Tools
   processesList: false,
   usersManagement: false,
   variables: false,
   // Structure
   schemas: false,
   tables: true,
   views: true,
   triggers: true,
   routines: true,
   functions: false,
   // Settings
   elementsWrapper: '"',
   stringsWrapper: '\'',
   tableAdd: true,
   tableSettings: true,
   tableRealCount: true,
   viewAdd: true,
   viewSettings: true,
   triggerAdd: true,
   triggerMultipleEvents: true,
   triggerSql: 'BEGIN\r\n\r\nEND',
   routineAdd: true,
   procedureContext: true,
   procedureContextValues: ['IN', 'OUT'],
   procedureSql: 'BEGIN\r\n\r\nEND',
   parametersLength: true,
   indexes: true,
   foreigns: true,
   nullable: true
};
