/**
 * @file defaults.ts
 * @description 数据库自定义配置的默认值
 *
 * 本文件定义了所有数据库客户端的默认配置项。
 * 所有配置项初始值都设为 false 或 null，
 * 各数据库特定配置文件（mysql.ts、postgresql.ts 等）会覆盖这些默认值。
 * 包含连接设置、功能开关、结构支持、DDL 操作等配置。
 *
 * @module common/customizations/defaults
 */
import { Customizations } from '../interfaces/customizations';

// Everything OFF
export const defaults: Customizations = {
   // Defaults
   defaultPort: null,
   defaultUser: null,
   defaultDatabase: null,
   dataTypes: [],
   indexTypes: [],
   foreignActions: [],
   operators: ['=', '!=', '>', '<', '>=', '<=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE', 'BETWEEN', 'IS NULL', 'IS NOT NULL'],
   // Core
   database: false,
   collations: false,
   engines: false,
   connectionSchema: false,
   sslConnection: false,
   sshConnection: false,
   fileConnection: false,
   cancelQueries: false,
   singleConnectionMode: false,
   // Tools
   processesList: false,
   usersManagement: false,
   variables: false,
   // Structure
   schemas: false,
   tables: false,
   views: false,
   triggers: false,
   triggerFunctions: false,
   routines: false,
   functions: false,
   schedulers: false,
   // Misc
   elementsWrapper: '',
   stringsWrapper: '"',
   tableAdd: false,
   tableTruncateDisableFKCheck: false,
   tableDdl: false,
   viewAdd: false,
   triggerAdd: false,
   triggerFunctionAdd: false,
   routineAdd: false,
   functionAdd: false,
   schedulerAdd: false,
   databaseEdit: false,
   schemaEdit: false,
   schemaDrop: false,
   schemaExport: false,
   exportByChunks: false,
   schemaImport: false,
   tableSettings: false,
   tableArray: false,
   tableRealCount: false,
   tableDuplicate: false,
   tableCheck: false,
   viewSettings: false,
   triggerSettings: false,
   triggerFunctionSettings: false,
   routineSettings: false,
   functionSettings: false,
   schedulerSettings: false,
   indexes: false,
   foreigns: false,
   sortableFields: false,
   unsigned: false,
   nullable: false,
   nullablePrimary: false,
   zerofill: false,
   autoIncrement: false,
   comment: false,
   collation: false,
   definer: false,
   onUpdate: false,
   viewAlgorithm: false,
   viewSqlSecurity: false,
   viewUpdateOption: false,
   procedureDeterministic: false,
   procedureDataAccess: false,
   procedureSql: null,
   procedureContext: false,
   procedureContextValues: [],
   procedureLanguage: false,
   functionDeterministic: false,
   functionDataAccess: false,
   functionSql: null,
   functionContext: false,
   functionLanguage: false,
   triggerSql: null,
   triggerStatementInCreation: false,
   triggerMultipleEvents: false,
   triggerTableInName: false,
   triggerUpdateColumns: false,
   triggerOnlyRename: false,
   triggerEnableDisable: false,
   triggerFunctionSql: null,
   triggerFunctionlanguages: null,
   parametersLength: false,
   languages: null,
   readOnlyMode: false
};
