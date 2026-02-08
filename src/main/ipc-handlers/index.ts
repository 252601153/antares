/**
 * @file index.ts
 * @description IPC 处理器入口
 *
 * 本文件是所有 IPC 处理器的入口文件。
 * 统一注册所有 IPC 事件处理器。
 * 连接主进程和渲染进程的通信桥梁。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/ipc-handlers/index
 */
import * as antares from 'common/interfaces/antares';

import application from './application';
import connection from './connection';
import database from './database';
import functions from './functions';
import routines from './routines';
import schedulers from './schedulers';
import schema from './schema';
import tables from './tables';
import triggers from './triggers';
import updates from './updates';
import users from './users';
import views from './views';

const connections: Record<string, antares.Client> = {};

export default () => {
   connection(connections);
   tables(connections);
   views(connections);
   triggers(connections);
   routines(connections);
   functions(connections);
   schedulers(connections);
   database(connections);
   schema(connections);
   users(connections);
   updates();
   application();
};
