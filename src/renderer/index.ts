/**
 * @file index.ts
 * @description 渲染进程入口文件
 *
 * 本文件是 Antares SQL Client 的渲染进程入口。
 * 负责初始化 Vue 应用、Pinia 状态管理、i18n 国际化、
 * 注册全局指令和插件、设置 IPC 通信监听器。
 * 处理主进程发来的异常通知、更新状态、快捷键事件等。
 *
 * @module renderer
 */
'use strict';
import 'floating-vue/dist/style.css';
import 'leaflet/dist/leaflet.css';
import '@/scss/main.scss';

import { ipcRenderer } from 'electron';
import * as FloatingVue from 'floating-vue';
import { createPinia } from 'pinia';
import { VueMaskDirective } from 'v-mask';
import { createApp } from 'vue';

import App from '@/App.vue';
import { i18n } from '@/i18n';
import { useApplicationStore } from '@/stores/application';
import { QueryLog, useConsoleStore } from '@/stores/console';
import { useNotificationsStore } from '@/stores/notifications';
import { useSettingsStore } from '@/stores/settings';

// https://github.com/probil/v-mask/issues/498#issuecomment-827027834
const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
   beforeMount: vMaskV2.bind,
   updated: vMaskV2.componentUpdated,
   unmounted: vMaskV2.unbind
};

createApp(App)
   .directive('mask', vMaskV3)
   .use(createPinia())
   .use(i18n)
   .use(FloatingVue)
   .mount('#app');

const { locale } = useSettingsStore();
i18n.global.locale = locale;

// IPC exceptions
ipcRenderer.on('unhandled-exception', (event, error) => {
   useNotificationsStore().addNotification({ status: 'error', message: error.message });
   useConsoleStore().putLog('debug', {
      level: 'error',
      process: 'main',
      message: error.message,
      date: new Date()
   });
});
ipcRenderer.on('non-blocking-exception', (event, error) => {
   useNotificationsStore().addNotification({ status: 'error', message: error.message });
   useConsoleStore().putLog('debug', {
      level: 'error',
      process: 'main',
      message: error.message,
      date: new Date()
   });
});

// IPC query logs
ipcRenderer.on('query-log', (event, logRecord: QueryLog) => {
   useConsoleStore().putLog('query', logRecord);
});

ipcRenderer.on('toggle-console', () => {
   useConsoleStore().toggleConsole();
});

// IPC app updates
ipcRenderer.on('checking-for-update', () => {
   useApplicationStore().updateStatus = 'checking';
});

ipcRenderer.on('update-available', () => {
   useApplicationStore().updateStatus = 'available';
});

ipcRenderer.on('update-not-available', () => {
   useApplicationStore().updateStatus = 'noupdate';
});

ipcRenderer.on('check-failed', () => {
   useApplicationStore().updateStatus = 'nocheck';
});

ipcRenderer.on('no-auto-update', () => {
   useApplicationStore().updateStatus = 'disabled';
});

ipcRenderer.on('download-progress', (event, data) => {
   useApplicationStore().updateStatus = 'downloading';
   useApplicationStore().downloadProgress = data.percent;
});

ipcRenderer.on('update-downloaded', () => {
   useApplicationStore().updateStatus = 'downloaded';
});

ipcRenderer.on('link-to-download', () => {
   useApplicationStore().updateStatus = 'link';
});

// IPC shortcuts
ipcRenderer.on('toggle-preferences', () => {
   useApplicationStore().showSettingModal('general');
});

ipcRenderer.on('open-updates-preferences', () => {
   useApplicationStore().showSettingModal('update');
   ipcRenderer.send('check-for-updates');
});

ipcRenderer.on('update-shortcuts', (event, shortcuts) => {
   useSettingsStore().updateShortcuts(shortcuts);
});
