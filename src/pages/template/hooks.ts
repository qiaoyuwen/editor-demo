import type { Template } from '@/models/template';
import { TemplateServices } from '@/services/template';
import { DynamicValueClassName } from '@/utils/tinymce/models/dynamic-value';
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

  const gotoAdd = useCallback((id?: number) => {
    if (id) {
      history.push(`/template/edit?id=${id}`);
    } else {
      history.push(`/template/add`);
    }
  }, []);

  const exportToDoc = useCallback((item: Template) => {
    Modal.confirm({
      title: '确认导出？',
      onOk: async () => {
        try {
          const container = document.createElement('div');
          container.innerHTML = item.content;

          const dynamicValueItems = Array.from(
            container.querySelectorAll(`.${DynamicValueClassName}`),
          );
          dynamicValueItems.forEach((dynamicValueItem) => {
            // eslint-disable-next-line no-param-reassign
            dynamicValueItem.outerHTML = '{{ replace-value }}';
          });

          const html = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
            </head>
            <body>
              ${container.innerHTML}
            </body>
          </html>
          `;
          console.log('result', html);
          message.success('操作成功');
        } catch {
          message.error('操作失败');
        }
        tableActionRef.current?.reload();
      },
    });
  }, []);

  return [
    {
      tableActionRef,
    },
    {
      gotoAdd,
      deleteTemplate,
      exportToDoc,
    },
  ] as const;
};
