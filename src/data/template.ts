import { useRequest } from 'umi';
import { useCallback } from 'react';
import { TemplateServices } from '@/services/template';

export const useTemplate = (id?: string) => {
  const getCustomerCount = useCallback(async () => {
    if (!id) {
      return {};
    }
    const res = await TemplateServices.getTemplate(id);
    return {
      data: res.data,
    };
  }, [id]);
  const { data, loading } = useRequest(getCustomerCount);

  return [data, loading] as const;
};
