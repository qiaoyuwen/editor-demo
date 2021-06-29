import type { RequestConfig } from 'umi';
import { errorHandler, requestInterceptor } from './interceptors';
import { request } from 'umi';

export type HttpParams = Record<string, any> | URLSearchParams;
export interface PaginationParams {
  current: number;
  pageSize: number;
}

export interface ResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponseData<T> {
  list: T[];
  current: number;
  pageSize: number;
  total: number;
}

async function getJson<T>(url: string, params?: HttpParams): Promise<ResponseData<T>> {
  return request(url, {
    method: 'GET',
    params,
  });
}

async function getImageToBase64(url: string, params?: HttpParams): Promise<string> {
  return request(url, {
    method: 'GET',
    params,
    responseType: 'arrayBuffer',
  }).then(({ data }) => {
    return `data:image/png;base64,${btoa(
      new Uint8Array(data).reduce((resData, byte) => resData + String.fromCharCode(byte), ''),
    )}`;
  });
}

async function postJson<T>(url: string, data?: Record<string, any>): Promise<ResponseData<T>> {
  return request(url, {
    method: 'POST',
    data,
  });
}

async function putJson<T>(url: string, data?: Record<string, any>): Promise<ResponseData<T>> {
  return request(url, {
    method: 'PUT',
    data,
  });
}

async function postFile<T>(url: string, file: File): Promise<ResponseData<T>> {
  const formData = new FormData();
  formData.append('file', file);
  return request(url, {
    method: 'POST',
    data: formData,
  });
}

async function deleteRequest(url: string, data?: Record<string, any>): Promise<ResponseData<void>> {
  return request(url, {
    method: 'DELETE',
    data,
  });
}

const objectToFormData = (obj: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
};

export const HttpUtils = {
  getJson,
  postJson,
  putJson,
  postFile,
  getImageToBase64,
  deleteRequest,
  objectToFormData,
};

const requestConfig: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptor],
};

export default requestConfig;
