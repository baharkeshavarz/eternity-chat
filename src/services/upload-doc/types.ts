import { GetPersonalitiesResponse } from '../personality/types';
import { Response } from '../types/common';

export interface IDocumentParams {
  personality_name: string;
}

export interface IListDocumentPayload extends IDocumentParams {
  documents: [{ name: string }];
}

export interface IDocumentListResponse {
  files: string[];
}

export interface UploadDocumentService {
  (args: { payload: FormData }): Response<GetPersonalitiesResponse>;
}

export interface ListDocumentService {
  (args: { params: IDocumentParams }): Response<IListDocumentPayload>;
}

interface IDeleteDocumentParams extends IDocumentParams {
  document_name: string;
}

export interface DeleteDocumentService {
  (args: { params: IDeleteDocumentParams }): Response;
}
