import { AxiosPromise, AxiosRequestConfig } from './types/index'
import { buildUrl } from './helper/url'
import { transformRequestData, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  let { url, params, data, headers } = config
  config.url = buildUrl(url, params)
  config.headers = processHeaders(headers, data)
  config.data = transformRequestData(data)
  return xhr(config).then(res => {
    res.data = transformResponse(res.data)
    return res
  })
}

export default axios
