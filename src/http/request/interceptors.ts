import { AppConfig } from '@/config/app.config';
import { notification } from 'antd';
import type { RequestInterceptor, ResponseError } from 'umi-request';
import { CodeMessage } from './constant';
/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    if (response.status === 401 || response.status === 403) {
      // 略过
    } else {
      const errorText = CodeMessage[response.status] || response.statusText;
      const { status, url } = response;

      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// 请求拦截器
export const requestInterceptor: RequestInterceptor = (url, options) => {
  const token = localStorage.getItem(AppConfig.LocalStorage.Token);
  return {
    url: `/api${url}`,
    options: {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  };
};
