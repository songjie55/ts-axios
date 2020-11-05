import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config
  let rq = new XMLHttpRequest()
  rq.open(method.toUpperCase(), url, true)
  rq.send(data)
}
