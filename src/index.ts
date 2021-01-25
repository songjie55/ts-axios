import { AxiosRequestConfig } from './types/index'
import { buildUrl } from './helper/url'
import { transformRequestData } from './helper/data'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  const { url, params, data } = config
  config.url = buildUrl(url, params)
  config.data = transformRequestData(data)
  xhr(config)
}

export default axios
