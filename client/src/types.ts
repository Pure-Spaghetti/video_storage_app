export enum EPages {
  "UPLOAD_FORM" = "/files/upload",
  "FILES_LIST" = "/files/view"
};

export interface IFile {
  id: string,
  name: string,
  folder_id: string,
  s3file_object: {},
  size: string,
  temp_file_name: string,
  type: string,
}