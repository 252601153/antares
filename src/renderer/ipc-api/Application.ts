/**
 * @file Application.ts
 * @description 应用 IPC API
 *
 * 本文件封装了应用级别的 IPC 调用。
 * 提供便捷的方法调用主进程的应用功能。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/ipc-api/Application
 */
import { ShortcutRecord } from 'common/shortcuts';
import { ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from 'electron';

import { unproxify } from '../libs/unproxify';

export default class {
   static showOpenDialog (options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
      return ipcRenderer.invoke('show-open-dialog', unproxify(options));
   }

   static showSaveDialog (options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
      return ipcRenderer.invoke('show-save-dialog', unproxify(options));
   }

   static getDownloadPathDirectory (): Promise<string> {
      return ipcRenderer.invoke('get-download-dir-path');
   }

   static reloadShortcuts () {
      return ipcRenderer.invoke('reload-shortcuts');
   }

   static updateShortcuts (shortcuts: ShortcutRecord[]) {
      return ipcRenderer.invoke('update-shortcuts', unproxify(shortcuts));
   }

   static restoreDefaultShortcuts () {
      return ipcRenderer.invoke('resotre-default-shortcuts');
   }

   static unregisterShortcuts () {
      return ipcRenderer.invoke('unregister-shortcuts');
   }

   static readFile (params: {filePath: string; encoding: string}): Promise<string> {
      return ipcRenderer.invoke('read-file', params);
   }

   static writeFile (path: string, content: unknown) {
      return ipcRenderer.invoke('write-file', path, content);
   }
}
