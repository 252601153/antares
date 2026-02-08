/**
 * @file workers.ts
 * @description Web Workers 接口定义
 *
 * 本文件定义了后台任务（Worker）相关的接口。
 * 用于导入导出等耗时操作的后台处理。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/interfaces/workers
 */
export type WorkerEvent = 'export-progress' | 'import-progress' | 'query-error' | 'end' | 'cancel' | 'error'

export interface WorkerIpcMessage {
   type: WorkerEvent;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   payload: any;
}
