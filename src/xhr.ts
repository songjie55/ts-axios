import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helper/headers'
import { createError } from './helper/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `request failed with status code ${response.status}`,
            config,
            null,
            rq,
            response
          )
        )
      }
    }

    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout
    } = config
    let rq = new XMLHttpRequest()
    rq.responseType = responseType || ''
    rq.timeout = timeout || 0
    rq.open(method.toUpperCase(), url, true)
    rq.onreadystatechange = function handleLoad() {
      if (rq.readyState !== 4) {
        return
      }
      if (rq.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(rq.getAllResponseHeaders())
      const responseData =
        responseType !== 'text' ? rq.response : rq.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: rq.status,
        statusText: rq.statusText,
        headers: responseHeaders,
        config,
        request: rq
      }
      handleResponse(response)
    }
    rq.onerror = function handleError() {
      reject(createError('Network Error', config, null, rq))
    }
    rq.ontimeout = function handleTimeout() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          rq
        )
      )
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        rq.setRequestHeader(name, headers[name])
      }
    })
    rq.send(data)
  })
}
