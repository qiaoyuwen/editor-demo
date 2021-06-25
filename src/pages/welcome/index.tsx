import type { FunctionComponent } from 'react';
import { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { AppConfig } from '@/config/app.config';
import styles from './index.less';
import { FilesServices } from '@/services/files';

const WelcomePage: FunctionComponent = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <PageContainer className={styles.container}>
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
            'insertdatetime table paste imagetools wordcount',
          ],
          toolbar:
            'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_url: '',

          images_upload_handler: async (blobInfo, success) => {
            const res = await FilesServices.uploadFile(
              new File([blobInfo.blob()], blobInfo.filename()),
            );
            success(`${AppConfig.ImgDomain}/${res.data.url}`);
          },
        }}
      />
    </PageContainer>
  );
};

export default WelcomePage;
