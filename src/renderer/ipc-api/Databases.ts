/**
 * @file Databases.ts
 * @description 数据库 IPC API
 *
 * 本文件封装了数据库操作相关的 IPC 调用。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/ipc-api/Databases
 */
import { IpcResponse } from 'common/interfaces/antares';
import { ipcRenderer } from 'electron';

import { unproxify } from '../libs/unproxify';

export default class {
   static getDatabases (params: string): Promise<IpcResponse> {
      return ipcRenderer.invoke('get-databases', unproxify(params));
   }
}
