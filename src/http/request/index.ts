import type { RequestConfig } from 'umi';
import { errorHandler, requestInterceptor } from './interceptors';
import { request } from 'umi';

export type HttpParams = Record<string, any> | URLSearchParams;

export interface ResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
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

async function postFile<T>(
  url: string,
  fileObj: Record<string, File>,
  jsonObj: Record<string, any> = {},
): Promise<ResponseData<T>> {
  const formData = new FormData();
  Object.keys(fileObj).forEach((key) => {
    formData.append(key, fileObj[key]);
  });
  Object.keys(jsonObj).forEach((key) => {
    formData.append(
      key,
      new Blob([JSON.stringify(jsonObj[key])], {
        type: 'application/json;charset=utf-8',
      }),
    );
  });
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
