/**
 * @file validateSender.ts
 * @description IPC 发送者验证
 *
 * 本文件提供 IPC 消息发送者的验证功能。
 * 用于安全检查，确保消息来源可信。
 *
 * @module /Users/zhangzhiming/code/antares/src/main/libs/misc/validateSender
 */
import { WebFrameMain } from 'electron';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isWindows = process.platform === 'win32';
const indexPath = path.resolve(__dirname, 'index.html').split(path.sep).join('/');

export function validateSender (frame: WebFrameMain) {
   if (isWindows) return true; // TEMP HOTFIX
   const frameUrl = new URL(frame.url);
   const prefix = isWindows ? 'file:///' : 'file://';
   const framePath = frameUrl.href.replace(prefix, '');

   if ((isDevelopment && frameUrl.host === 'localhost:9080') || framePath === indexPath) return true;
   return false;
}
