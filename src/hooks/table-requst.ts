import type {
  HttpParams,
  PaginationParams,
  PaginationResponseData,
  ResponseData,
} from '@/http/request';
import { useCallback } from 'react';

export function useTableRequest<P, T = any>(
  service: (
    params: HttpParams & PaginationParams,
  ) => Promise<ResponseData<PaginationResponseData<P>>>,
) {
  const request = useCallback(
    async (
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      params: T & {
        pageSize: number;
        current: number;
      },
    ) => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      try {
        const { data } = await service(params);

        return {
          data: data.list,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: true,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: data.total,
        };
      } catch {
        return {
          data: [],
          success: false,
          total: 0,
        };
      }
    },
    [service],
  );
  return [request] as const;
}
