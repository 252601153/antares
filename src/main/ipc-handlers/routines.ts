/**
 * @file routines.ts
 * @description 存储过程 IPC 处理器
 *
 * 本文件处理存储过程相关的 IPC 事件。
 * 包括创建、修改、删除、执行存储过程等。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/ipc-handlers/routines
 */
import * as antares from 'common/interfaces/antares';
import { ipcMain } from 'electron';

import { validateSender } from '../libs/misc/validateSender';

export default (connections: Record<string, antares.Client>) => {
   ipcMain.handle('get-routine-informations', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         const result = await connections[params.uid].getRoutineInformations(params);
         return { status: 'success', response: result };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('drop-routine', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].dropRoutine(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('alter-routine', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].alterRoutine(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });

   ipcMain.handle('create-routine', async (event, params) => {
      if (!validateSender(event.senderFrame)) return { status: 'error', response: 'Unauthorized process' };

      try {
         await connections[params.uid].createRoutine(params);
         return { status: 'success' };
      }
      catch (err) {
         return { status: 'error', response: err.toString() };
      }
   });
};
