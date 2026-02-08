/**
 * @file customizations.ts
 * @description 数据库自定义配置接口
 *
 * 本文件定义了 Customizations 接口类型。
 * 用于描述各数据库特有的功能和配置项。
 * 被 mysql.ts、postgresql.ts 等配置文件实现。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/interfaces/customizations
 */
import { TypesGroup } from './antares';
import { TableFilterOperator } from './tableApis';

export interface Customizations {
   // Defaults
   defaultPort?: number;
   defaultUser?: string;
   defaultDatabase?: string;
   dataTypes?: TypesGroup[];
   indexTypes?: string[];
   foreignActions?: string[];
   operators?: TableFilterOperator[];
   // Core
   database?: boolean;
   collations?: boolean;
   engines?: boolean;
   connectionSchema?: boolean;
   sslConnection?: boolean;
   sshConnection?: boolean;
   fileConnection?: boolean;
   cancelQueries?: boolean;
   singleConnectionMode?: boolean;
   // Tools
   processesList?: boolean;
   usersManagement?: boolean;
   variables?: boolean;
   // Structure
   schemas?: boolean;
   tables?: boolean;
   views?: boolean;
   materializedViews?: boolean;
   triggers?: boolean;
   triggerFunctions?: boolean;
   routines?: boolean;
   functions?: boolean;
   schedulers?: boolean;
   // Misc
   elementsWrapper: string;
   stringsWrapper: string;
   tableAdd?: boolean;
   tableSettings?: boolean;
   tableDuplicate?: boolean;
   tableArray?: boolean;
   tableRealCount?: boolean;
   tableTruncateDisableFKCheck?: boolean;
   tableCheck?: boolean;
   tableDdl?: boolean;
   viewAdd?: boolean;
   viewSettings?: boolean;
   materializedViewAdd?: boolean;
   materializedViewSettings?: boolean;
   triggerAdd?: boolean;
   triggerFunctionAdd?: boolean;
   routineAdd?: boolean;
   functionAdd?: boolean;
   schedulerAdd?: boolean;
   databaseEdit?: boolean;
   schemaEdit?: boolean;
   schemaDrop?: boolean;
   schemaExport?: boolean;
   exportByChunks?: boolean;
   schemaImport?: boolean;
   triggerSettings?: boolean;
   triggerFunctionSettings?: boolean;
   routineSettings?: boolean;
   functionSettings?: boolean;
   schedulerSettings?: boolean;
   indexes?: boolean;
   foreigns?: boolean;
   sortableFields?: boolean;
   unsigned?: boolean;
   nullable?: boolean;
   nullablePrimary?: boolean;
   zerofill?: boolean;
   autoIncrement?: boolean;
   comment?: boolean;
   collation?: boolean;
   definer?: boolean;
   onUpdate?: boolean;
   viewAlgorithm?: boolean;
   viewSqlSecurity?: boolean;
   viewUpdateOption?: boolean;
   procedureDeterministic?: boolean;
   procedureDataAccess?: boolean;
   procedureSql?: string;
   procedureContext?: boolean;
   procedureContextValues?: string[];
   procedureLanguage?: boolean;
   functionDeterministic?: boolean;
   functionDataAccess?: boolean;
   functionSql?: string;
   functionContext?: boolean;
   functionLanguage?: boolean;
   triggerSql?: string;
   triggerStatementInCreation?: boolean;
   triggerMultipleEvents?: boolean;
   triggerTableInName?: boolean;
   triggerUpdateColumns?: boolean;
   triggerOnlyRename?: boolean;
   triggerEnableDisable?: boolean;
   triggerFunctionSql?: string;
   triggerFunctionlanguages?: string[];
   parametersLength?: boolean;
   languages?: string[];
   readOnlyMode?: boolean;
}
