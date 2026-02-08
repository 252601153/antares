/**
 * @file schedulers.ts
 * @description 调度器 IPC 处理器
 *
 * 本文件处理调度器/事件相关的 IPC 事件。
 * 包括创建、修改、删除调度任务等。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/ipc-handlers/schedulers
 */
import * as antares from 'common/interfaces/antares';
import { ipcMain } from 'electron';

import { validateSender } from '../libs/misc/validateSender';

export default (connections: Record<string, antares.Client>) => {
   ipcMain.handle('get-scheduler-informations', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         const result = await connections[params.uid].getEventInformations(params);
         return { status: 'success', response: result };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('drop-scheduler', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].dropEvent(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('alter-scheduler', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].alterEvent(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('create-scheduler', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].createEvent(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('toggle-scheduler', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         if (!params.enabled)
            await connections[params.uid].enableEvent({ ...params });
         else
            await connections[params.uid].disableEvent({ ...params });
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });
};
