/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, type AxiosRequestConfig,  } from "axios";
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: any; 
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };


export default axiosBaseQuery;
