/**
 * @file users.ts
 * @description 用户管理 IPC 处理器
 *
 * 本文件处理数据库用户管理相关的 IPC 事件。
 * 包括创建用户、修改权限等（部分数据库支持）。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/ipc-handlers/users
 */
import * as antares from 'common/interfaces/antares';
import { ipcMain } from 'electron';

import { validateSender } from '../libs/misc/validateSender';

export default (connections: Record<string, antares.Client>) => {
   ipcMain.handle('get-users', async (event, uid) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         const result = await connections[uid].getUsers();
         return { status: 'success', response: result };
      }
      catch (err) {
         if (err.code === 'ER_TABLEACCESS_DENIED_ERROR')
            return { status: 'success', response: [] };
         return { status: 'error', response: err.toString() };
      }
   });
};
