import type { PaginationParams, PaginationResponseData } from '@/http/request';
import { HttpUtils } from '@/http/request';
import type { Template } from '@/models/template';

const templatePageList = async (params?: PaginationParams) => {
  return HttpUtils.getJson<PaginationResponseData<Template>>('/templates', params);
};

const createTemplate = async (params?: { name: string; content: string }) => {
  return HttpUtils.postJson<Template>('/templates', params);
};

export const TemplateServices = {
  templatePageList,
  createTemplate,
};
