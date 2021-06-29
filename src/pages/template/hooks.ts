import type { Template } from '@/models/template';
import { TemplateServices } from '@/services/template';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import { useRef, useCallback } from 'react';
import { history } from 'umi';

export const useTemplatePageList = () => {
  const tableActionRef = useRef<ActionType>();

  const deleteTemplate = useCallback((item: Template) => {
    Modal.confirm({
      title: '确认删除？',
      onOk: async () => {
        try {
          await TemplateServices.deleteTemplate(`${item.id}`);
          message.success('操作成功');
        } catch {
          message.error('操作失败');
        }
        tableActionRef.current?.reload();
      },
    });
  }, []);

  const gotoAdd = (id?: number) => {
    if (id) {
      history.push(`/template/edit?id=${id}`);
    } else {
      history.push(`/template/add`);
    }
  };

  return [
    {
      tableActionRef,
    },
    {
      gotoAdd,
      deleteTemplate,
    },
  ] as const;
};
