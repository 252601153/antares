/**
 * @file Users.ts
 * @description 用户 IPC API
 *
 * 本文件封装了用户管理相关的 IPC 调用。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/ipc-api/Users
 */
import { IpcResponse } from 'common/interfaces/antares';
import { ipcRenderer } from 'electron';

import { unproxify } from '../libs/unproxify';

export default class {
   static getUsers (params: string): Promise<IpcResponse> {
      return ipcRenderer.invoke('get-users', unproxify(params));
   }
}
