import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const fetchAPI = async ({
  method = 'GET',
  url,
  params,
  data,
}: AxiosRequestConfig): Promise<AxiosResponse> => {
  const token = localStorage.getItem('token')
  return await axios({
    method,
    baseURL: process.env.REACT_APP_BACKEND,
    params,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { authorization: token }),
    },
  })
}

export const isLikelyAuthorized = (): boolean => {
  const token = localStorage.getItem('token')
  const expires_in = localStorage.getItem('expires_in')
  const tokenIsExpired = Number(expires_in) < new Date().getTime()
  return Boolean(token && !tokenIsExpired)
}
