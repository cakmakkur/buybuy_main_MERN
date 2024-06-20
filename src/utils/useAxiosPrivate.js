import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuthContext } from "../global_variables/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true
})


const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuthContext()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      //it starts with config
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      }, (err) => Promise.reject(err)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      response => response,
      async (err) => {
        // this way we access the previous request with axios
        const prevRequest = err?.config
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(err)
      }
    )
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor)
      axiosPrivate.interceptors.request.eject(requestInterceptor)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate;