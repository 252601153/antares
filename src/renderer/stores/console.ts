/**
 * @file console.ts
 * @description 控制台状态管理 Store
 *
 * 本文件使用 Pinia 管理调试控制台的状态。
 * 记录查询日志、错误信息、调试信息等。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/stores/console
 */
import { defineStore } from 'pinia';

const logsSize = 1000;

export type LogType = 'query' | 'debug'
export interface QueryLog {
   cUid: string;
   sql: string;
   date: Date;
}

export interface DebugLog {
   level: 'log' | 'info' | 'warn' | 'error' | string;
   process: 'renderer' | 'main' | 'worker';
   message: string;
   date: Date;
}

export const useConsoleStore = defineStore('console', {
   state: () => ({
      isConsoleOpen: false,
      queryLogs: [] as QueryLog[],
      debugLogs: [] as DebugLog[],
      selectedTab: 'query' as LogType,
      consoleHeight: 0
   }),
   getters: {
      getLogsByWorkspace: state => (uid: string) => state.queryLogs.filter(r => r.cUid === uid)
   },
   actions: {
      putLog (type: LogType, record: QueryLog | DebugLog) {
         if (type === 'query') {
            this.queryLogs.push(record);

            if (this.queryLogs.length > logsSize)
               this.queryLogs = this.queryLogs.slice(0, logsSize);
         }
         else if (type === 'debug') {
            this.debugLogs.push(record);

            if (this.debugLogs.length > logsSize)
               this.debugLogs = this.debugLogs.slice(0, logsSize);
         }
      },
      openConsole () {
         this.isConsoleOpen = true;
         this.consoleHeight = 250;
      },
      closeConsole () {
         this.isConsoleOpen = false;
         this.consoleHeight = 0;
      },
      resizeConsole (height: number) {
         if (height < 30)
            this.closeConsole();
         else
            this.consoleHeight = height;
      },
      toggleConsole () {
         if (this.isConsoleOpen)
            this.closeConsole();
         else
            this.openConsole();
      }
   }
});
