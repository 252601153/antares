/**
 * @file ClientsFactory.ts
 * @description 数据库客户端工厂类
 *
 * 本文件实现了工厂模式的数据库客户端创建。
 * 根据数据库类型（MySQL、PostgreSQL 等）创建对应的客户端实例。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/libs/ClientsFactory
 */
import * as antares from 'common/interfaces/antares';

import { FirebirdSQLClient } from './clients/FirebirdSQLClient';
import { MySQLClient } from './clients/MySQLClient';
import { PostgreSQLClient } from './clients/PostgreSQLClient';
import { SQLiteClient } from './clients/SQLiteClient';

export class ClientsFactory {
   static getClient (args: antares.ClientParams) {
      switch (args.client) {
         case 'mysql':
         case 'maria':
            return new MySQLClient(args);
         case 'pg':
            return new PostgreSQLClient(args);
         case 'sqlite':
            return new SQLiteClient(args);
         case 'firebird':
            return new FirebirdSQLClient(args);
         default:
            throw new Error(`Unknown database client: ${args.client}`);
      }
   }
}
