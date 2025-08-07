import { axiosInstance } from '../../lib/axios';
import {
  DeleteDocumentService,
  ListDocumentService,
  UploadDocumentService,
} from './types';

const BASE_URL = '/api/v1';

export const uploadDocumentsat: UploadDocumentService = ({
  payload,
  params,
}) => {
  return axiosInstance.post(
    `${BASE_URL}/upload-documents/${params.user_id}/${params.personality_name}`,
    payload,
    { params, headers: { 'Content-Type': 'multipart/form-data' } },
  );
};

export const listDocumentsat: ListDocumentService = ({ params }) => {
  return axiosInstance.get(
    `${BASE_URL}/documents/${params.user_id}/${params.personality_name}`,
    { params },
  );
};

export const deleteDocument: DeleteDocumentService = ({ params }) => {
  return axiosInstance.delete(
    `${BASE_URL}/documents/${params.user_id}/${params.personality_name}/${params.document_name}`,
  );
};
