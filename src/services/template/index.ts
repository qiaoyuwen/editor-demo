import type { PaginationParams, PaginationResponseData } from '@/http/request';
import { HttpUtils } from '@/http/request';
import type { Template } from '@/models/template';

const templatePageList = async (params?: PaginationParams) => {
  return HttpUtils.getJson<PaginationResponseData<Template>>('/templates', params);
};

const createTemplate = async (params: { name: string; content?: string }) => {
  return HttpUtils.postJson<Template>('/templates', params);
};

const getTemplate = async (id: string) => {
  return HttpUtils.getJson<Template>(`/templates/${id}`);
};

const updateTemplate = async (id: string, params: { name?: string; content?: string }) => {
  return HttpUtils.putJson<Template>(`/templates/${id}`, params);
};

const deleteTemplate = async (id: string) => {
  return HttpUtils.deleteRequest(`/templates/${id}`);
};

const getValue = async (params: { tableName: string; fieldName: string }) => {
  return HttpUtils.getJson<any>('/templates/getValue', params);
};

const getTableValue = async (params: { tableName: string }) => {
  return HttpUtils.getJson<{
    fields: any[];
    values: any[];
  }>('/templates/getTableValue', params);
};

export const TemplateServices = {
  templatePageList,
  createTemplate,
  getTemplate,
  deleteTemplate,
  updateTemplate,
  getValue,
  getTableValue,
};
