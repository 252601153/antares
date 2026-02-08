/**
 * @file index.ts
 * @description 数据库自定义配置入口文件
 *
 * 本文件导出所有数据库的自定义配置对象。
 * 统一管理 MySQL/MariaDB、PostgreSQL、SQLite、Firebird 的配置。
 * 其他模块通过此文件获取特定数据库的配置信息。
 *
 * @module common/customizations
 */
import * as firebird from 'common/customizations/firebird';
import * as mysql from 'common/customizations/mysql';
import * as postgresql from 'common/customizations/postgresql';
import * as sqlite from 'common/customizations/sqlite';
import { Customizations } from 'common/interfaces/customizations';

export default {
   maria: mysql.customizations,
   mysql: mysql.customizations,
   pg: postgresql.customizations,
   sqlite: sqlite.customizations,
   firebird: firebird.customizations
} as {
   maria: Customizations;
   mysql: Customizations;
   pg: Customizations;
   sqlite: Customizations;
   firebird: Customizations;
};
