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
import { TemplateServices } from '@/services/template';
import { useState } from 'react';
import { useTemplate } from '@/data/template';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { DynamicTableValue } from '@/utils/tinymce/models/dynamic-table-value';

interface Props {
  location: {
    query: {
      id?: string;
    };
  };
}

const Component: FunctionComponent<Props> = (props) => {
  const { id } = props.location.query;
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const tocDivRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [template, templateLoading] = useTemplate(id);

  const [form] = useForm<{
    name: string;
  }>();

  const setToc = useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    let content = editorRef.current.getContent();
    if (!content) {
      return;
    }
    const ele = document.createElement('div');
    ele.innerHTML = content;
    let tocEle = ele.querySelector('.mce-toc');
    if (tocEle) {
      editorRef.current.execCommand('mceUpdateToc');
    } else {
      editorRef.current.execCommand('mceInsertToc');
    }

    content = editorRef.current.getContent();
    ele.innerHTML = content;
    tocEle = ele.querySelector('.mce-toc');
    if (tocEle && tocDivRef.current) {
      tocDivRef.current.innerHTML = tocEle.outerHTML;
    }
  }, []);

  const init = useCallback(() => {
    if (template && editorRef.current && form) {
      form.setFieldsValue({
        name: template.name,
      });
      editorRef.current.setContent(template.content);
      setToc();
    }
  }, [form, template, setToc]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <PageContainer
      className={styles.container}
      extra={[
        <Button key="back" type="primary" onClick={() => history.goBack()}>
          ??????
        </Button>,
      ]}
    >
      <Card loading={loading || templateLoading}>
        <ProForm<{
          name: string;
        }>
          form={form}
          onFinish={async (values) => {
            try {
              const content = editorRef.current?.getContent() || '';
              if (!id) {
                await TemplateServices.createTemplate({
                  name: values.name,
                  content,
                });
              } else {
                await TemplateServices.updateTemplate(id, {
                  name: values.name,
                  content,
                });
              }
              message.success('????????????');
            } catch {
              message.error('????????????');
            }
            history.goBack();
          }}
          layout="inline"
          style={{ marginBottom: '20px' }}
        >
          <ProFormText name="name" label="????????????" rules={[{ required: true, message: '??????' }]} />
        </ProForm>
      </Card>

      <div className={styles.editorContainer}>
        <Card className={styles.editorTocCard}>
          <div
            className={styles.editorToc}
            ref={tocDivRef}
            onClick={(e) => {
              // ??????????????????
              const iframeEle = document.querySelector('iframe');
              if (!iframeEle || !iframeEle.contentWindow || !iframeEle.contentWindow.location) {
                return;
              }
              iframeEle.contentWindow.location.hash = '';

              const target = e.target as HTMLElement | null;
              if (target?.tagName !== 'A') {
                return;
              }
              const href = target.getAttribute('href')?.replace('#', '');
              if (!href) {
                return;
              }
              iframeEle.contentWindow.location.hash = href;
            }}
          ></div>
        </Card>
        <div className={styles.editor}>
          <Editor
            apiKey={AppConfig.TinyMCEKey}
            onInit={(_evt, editor) => {
              editor.on('input', () => {
                setToc();
              });
              editorRef.current = editor;

              setTimeout(() => {
                setLoading(false);
                init();
              }, 100);
            }}
            init={{
              language: 'zh_CN',
              height: '100%',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime table paste imagetools wordcount noneditable toc',
              ],
              toolbar:
                'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | dynamicmenu',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } .mce-toc { display: none; }',
              // ??????
              images_upload_url: '',
              images_upload_handler: async (blobInfo, success) => {
                const res = await FilesServices.uploadFile(
                  new File([blobInfo.blob()], blobInfo.filename()),
                );
                success(`${AppConfig.ImgDomain}/${res.data.url}`);
              },
              paste_data_images: true,
              // ??????????????????
              setup: (editor) => {
                editor.ui.registry.addMenuButton('dynamicmenu', {
                  text: '????????????',
                  fetch: (callback) => {
                    const items: TinyMCEUi.Menu.NestedMenuItemContents[] = [
                      {
                        type: 'menuitem',
                        text: '?????????',
                        onAction: () => {
                          const dialogConfig: TinyMCEUi.Dialog.DialogSpec<{
                            tableName: string;
                            tableField: string;
                          }> = {
                            title: '???????????????',
                            body: {
                              type: 'panel',
                              items: [
                                {
                                  type: 'input',
                                  name: 'tableName',
                                  label: '??????',
                                },
                                {
                                  type: 'input',
                                  name: 'tableField',
                                  label: '?????????',
                                },
                              ],
                            },
                            buttons: [
                              {
                                type: 'cancel',
                                name: 'closeButton',
                                text: '??????',
                              },
                              {
                                type: 'submit',
                                name: 'submitButton',
                                text: '??????',
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
                        text: '????????????',
                        onAction: () => {
                          const dialogConfig: TinyMCEUi.Dialog.DialogSpec<{
                            tableName: string;
                          }> = {
                            title: '???????????????',
                            body: {
                              type: 'panel',
                              items: [
                                {
                                  type: 'input',
                                  name: 'tableName',
                                  label: '??????',
                                },
                              ],
                            },
                            buttons: [
                              {
                                type: 'cancel',
                                name: 'closeButton',
                                text: '??????',
                              },
                              {
                                type: 'submit',
                                name: 'submitButton',
                                text: '??????',
                                primary: true,
                              },
                            ],
                            onSubmit: (api) => {
                              const data = api.getData();

                              const item = new DynamicTableValue(data.tableName);
                              editor.insertContent(item.createHtml());

                              api.close();
                            },
                          };
                          editor.windowManager.open(dialogConfig);
                        },
                      },
                    ];
                    callback(items);
                  },
                });

                editor.ui.registry.addButton('direcotorybutton', {
                  text: '??????',
                  onAction: () => setToc(),
                });
              },
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Component;
