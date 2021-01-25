import { isPlainObject } from './utils'

function normalizeHeaderName(headres: any, normalizeName: string): void {
  if (!headres) return
  Object.keys(headres).forEach(name => {
    // 大小写不一致，但是转换成全大写是一致的
    if (
      name !== normalizeName &&
      name.toUpperCase() === normalizeName.toUpperCase()
    ) {
      headres[normalizeName] = headres[name]
      delete headres[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
}
