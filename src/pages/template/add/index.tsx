import type { FunctionComponent } from 'react';
import { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor, Ui as TinyMCEUi } from 'tinymce';
import { AppConfig } from '@/config/app.config';
import styles from './index.less';
import { FilesServices } from '@/services/files';
import { DynamicValue } from '@/utils/tinymce/models/dynamic-value';
import { Button, Card, message } from 'antd';
import { history } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useForm } from 'antd/es/form/Form';

const WelcomePage: FunctionComponent = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [form] =
    useForm<{
      name: string;
    }>();

  return (
    <PageContainer
      className={styles.container}
      extra={[
        <Button key="back" type="primary" onClick={() => history.goBack()}>
          返回
        </Button>,
      ]}
    >
      <Card>
        <ProForm<{
          name: string;
        }>
          form={form}
          onFinish={async (values) => {
            try {
              console.log(values);
              message.success('操作成功');
            } catch {
              message.error('操作失败');
            }
            history.goBack();
          }}
          layout="inline"
          style={{ marginBottom: '20px' }}
        >
          <ProFormText name="name" label="模板名称" rules={[{ required: true, message: '必填' }]} />
        </ProForm>
      </Card>
      <div className={styles.editorContainer}>
        <Editor
          apiKey={AppConfig.TinyMCEKey}
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          init={{
            language: 'zh_CN',
            height: '100%',
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime table paste imagetools wordcount noneditable',
            ],
            toolbar:
              'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | dynamicmenu',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            // 图片
            images_upload_url: '',
            images_upload_handler: async (blobInfo, success) => {
              const res = await FilesServices.uploadFile(
                new File([blobInfo.blob()], blobInfo.filename()),
              );
              success(`${AppConfig.ImgDomain}/${res.data.url}`);
            },
            paste_data_images: true,
            // 自定义动态值
            setup: (editor) => {
              editor.ui.registry.addMenuButton('dynamicmenu', {
                text: '动态插入',
                fetch: (callback) => {
                  const items: TinyMCEUi.Menu.NestedMenuItemContents[] = [
                    {
                      type: 'menuitem',
                      text: '动态值',
                      onAction: () => {
                        const dialogConfig: TinyMCEUi.Dialog.DialogSpec<{
                          tableName: string;
                          tableField: string;
                        }> = {
                          title: '添加动态值',
                          body: {
                            type: 'panel',
                            items: [
                              {
                                type: 'input',
                                name: 'tableName',
                                label: '表名',
                              },
                              {
                                type: 'input',
                                name: 'tableField',
                                label: '字段名',
                              },
                            ],
                          },
                          buttons: [
                            {
                              type: 'cancel',
                              name: 'closeButton',
                              text: '取消',
                            },
                            {
                              type: 'submit',
                              name: 'submitButton',
                              text: '保存',
                              primary: true,
                            },
                          ],
                          onSubmit: (api) => {
                            const data = api.getData();

                            const item = new DynamicValue(data.tableName, data.tableField);
                            editor.insertContent(item.createHtml());

                            api.close();
                          },
                        };
                        editor.windowManager.open(dialogConfig);
                      },
                    },
                    {
                      type: 'menuitem',
                      text: '动态表格',
                      onAction: () => {
                        editor.plugins.table.insertTable(2, 3);
                      },
                    },
                  ];
                  callback(items);
                },
              });
            },
          }}
        />
      </div>
    </PageContainer>
  );
};

export default WelcomePage;
