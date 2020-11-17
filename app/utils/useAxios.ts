import { reactive, toRefs } from 'vue'

import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from 'axios'
import _ from 'lodash'

interface AxiosState {
  response: AxiosResponse | null;
  data: object;
  finished: boolean;
  canceled: boolean;
  error: AxiosError | null;
}

interface AxiosOptions {
  debounce?: number;
  throttle?: number;
}

const state = reactive<AxiosState>({
  response: null,
  data: {},
  finished: false,
  canceled: false,
  error: null
})

const request = (
  url: string,
  config?: AxiosRequestConfig,
  options?: AxiosOptions
) => {
  console.log(options)
  axios(url, config)
    .then((r: AxiosResponse) => {
      state.response = r
      state.data = r.data
      state.finished = true
    })
    .catch((e: AxiosError) => {
      state.error = e
      state.finished = true
    })
}

const useAxios = (
  url: string,
  config?: AxiosRequestConfig,
  options?: AxiosOptions
) => {
  // handle cancel request
  const cancelToken: CancelTokenSource = axios.CancelToken.source()
  const cancel = (message?: string) => {
    cancelToken.cancel(message)
    state.canceled = true
  }

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    cancelToken: cancelToken.token
  }

  let refetch
  if (options && options.debounce && options.debounce > 0) {
    refetch = _.debounce(() => {
      return request(url, axiosConfig, options)
    }, options.debounce)
  } else if (options && options.throttle && options.throttle > 0) {
    refetch = _.throttle(() => {
      return request(url, axiosConfig, options)
    }, options.throttle)
  } else {
    refetch = () => request(url, axiosConfig, options)
  }

  refetch()

  return {
    ...toRefs(state),
    refetch,
    cancel
  }
}

export { useAxios }
