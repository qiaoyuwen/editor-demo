import type { Template } from '@/models/template';
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
          console.log('deleteTemplate', item);
          message.success('操作成功');
        } catch {
          message.error('操作失败');
        }
        tableActionRef.current?.reload();
      },
    });
  }, []);

  const gotoAdd = (id?: number) => {
    history.push(`/template/add${id ? `?id=${id}` : ''}`);
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
