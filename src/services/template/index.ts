import type { PaginationParams } from '@/http/request';
import { HttpUtils } from '@/http/request';

const templatePageList = async (params?: PaginationParams) => {
  return HttpUtils.getJson<any>('/templates', params);
};

export const TemplateServices = {
  templatePageList,
};
