/**
 * @file Connection.ts
 * @description 连接 IPC API
 *
 * 本文件封装了数据库连接相关的 IPC 调用。
 * 提供便捷的方法进行连接管理。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/ipc-api/Connection
 */
import { ConnectionParams, IpcResponse } from 'common/interfaces/antares';
import { ipcRenderer } from 'electron';

import { unproxify } from '../libs/unproxify';

export default class {
   static makeTest (params: ConnectionParams & { connString?: string }): Promise<IpcResponse> {
      return ipcRenderer.invoke('test-connection', unproxify(params));
   }

   static connect (params: ConnectionParams & { connString?: string }): Promise<IpcResponse> {
      return ipcRenderer.invoke('connect', unproxify(params));
   }

   static abortConnection (uid: string): void {
      ipcRenderer.send('abort-connection', uid);
   }

   static checkConnection (uid: string): Promise<boolean> {
      return ipcRenderer.invoke('check-connection', uid);
   }

   static disconnect (uid: string): Promise<void> {
      return ipcRenderer.invoke('disconnect', uid);
   }
}
