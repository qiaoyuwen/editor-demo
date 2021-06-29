import type { FunctionComponent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { Template } from '@/models/template';
import { useTemplatePageList } from './hooks';
import Actions from '@/components/actions';
import { TemplateServices } from '@/services/template';
import { useTableRequest } from '@/hooks/table-requst';

const WelcomePage: FunctionComponent = () => {
  const [request] = useTableRequest<Template>(TemplateServices.templatePageList);
  const [{ tableActionRef }, { gotoAdd, deleteTemplate }] = useTemplatePageList();

  const columns: ProColumnType<Template>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      search: false,
    },
    {
      title: '模板名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      align: 'center',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      align: 'center',
      search: false,
      render: (_, item) => (
        <Actions>
          <Button key="edit" type="link" onClick={() => gotoAdd(item.id)}>
            编辑
          </Button>
          <Button key="delete" type="link" danger onClick={() => deleteTemplate(item)}>
            删除
          </Button>
        </Actions>
      ),
    },
  ];

  return (
    <PageContainer
      extra={[
        <Button key="add" type="primary" onClick={() => gotoAdd()}>
          新增模板
        </Button>,
      ]}
    >
      <ProTable<Template>
        actionRef={tableActionRef}
        columns={columns}
        rowKey="id"
        request={request}
      />
    </PageContainer>
  );
};

export default WelcomePage;
