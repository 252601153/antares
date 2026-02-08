/**
 * @file notifications.ts
 * @description 通知状态管理 Store
 *
 * 本文件使用 Pinia 管理应用通知的状态。
 * 包括成功、错误、警告等类型的通知消息。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/stores/notifications
 */
import { uidGen } from 'common/libs/uidGen';
import { defineStore } from 'pinia';

import { useConsoleStore } from './console';

export interface Notification {
   uid: string;
   status: string;
   message: string;
}

export const useNotificationsStore = defineStore('notifications', {
   state: () => ({
      notifications: [] as Notification[]
   }),
   actions: {
      addNotification (payload: { status: string; message: string }) {
         const notification: Notification = { uid: uidGen('N'), ...payload };
         this.notifications.unshift(notification);

         useConsoleStore().putLog('debug', {
            level: notification.status,
            process: 'renderer',
            message: notification.message,
            date: new Date()
         });
      },
      removeNotification (uid: string) {
         this.notifications = (this.notifications as Notification[]).filter(item => item.uid !== uid);
      }
   }
});
