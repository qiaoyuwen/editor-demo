import type { Template } from '@/models/template';
import { TemplateServices } from '@/services/template';
import { DynamicValueClassName } from '@/utils/tinymce/models/dynamic-value';
import type { ActionType } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import { useRef, useCallback } from 'react';
import { history } from 'umi';

const export2Word = (filename: string, content: string) => {
  const preHtml =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  const postHtml = '</body></html>';
  const html = preHtml + content + postHtml;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword',
  });

  // Specify link url
  const url = URL.createObjectURL(blob);

  // Create download link element
  const downloadLink = document.createElement('a');
  // Create a link to the file
  downloadLink.href = url;

  // Setting the file name
  downloadLink.download = filename;

  // triggering the function
  downloadLink.click();
};

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
          export2Word('test.doc', container.innerHTML);
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
