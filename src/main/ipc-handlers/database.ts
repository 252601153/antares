/**
 * @file database.ts
 * @description 数据库操作 IPC 处理器
 *
 * 本文件处理数据库级别的 IPC 事件。
 * 包括创建数据库、删除数据库等。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/ipc-handlers/database
 */
import * as antares from 'common/interfaces/antares';
import { ipcMain } from 'electron';

import { validateSender } from '../libs/misc/validateSender';

export default (connections: Record<string, antares.Client>) => {
   ipcMain.handle('get-databases', async (event, uid) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         const result = await connections[uid].getDatabases();
         return { status: 'success', response: result };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });
};
