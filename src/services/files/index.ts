import { HttpUtils } from '@/http/request/index';
import type { FileEntity } from '@/models/file';

const prefix = '/files';

const uploadFile = (file: File) => {
  return HttpUtils.postFile<FileEntity>(prefix, file);
};

export const FilesServices = {
  uploadFile,
};
