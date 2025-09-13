// 前端/後端結構化 log 與錯誤回報
export function logInfo(message: string, context?: any) {
  // 可擴充: 傳送到後端 API
  // eslint-disable-next-line no-console
  console.info('[INFO]', message, context || '');
}

export function logError(error: any, context?: any) {
  // 可擴充: 傳送到後端 API
  // eslint-disable-next-line no-console
  console.error('[ERROR]', error, context || '');
}
