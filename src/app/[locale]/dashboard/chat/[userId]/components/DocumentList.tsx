'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import DocumentListSkeleton from './DocumentListSkeleton';
import { useMutation } from '@tanstack/react-query';
import { deleteDocument } from '@/services/upload-doc';
import { toast } from 'react-toastify';
import useListDocuments from '../../../components/documents/hooks/useListDocuments';
import { useParams } from 'next/navigation';

const DocumentList = () => {
  const t = useTranslations();
  const params = useParams<{ userId: string }>();
  const userName = params.userId;

  const { data, isFetching, refetch } = useListDocuments({
    personality_name: userName,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteDocument,
  });

  const handleDelete = async (docName: string) => {
    const { data, status } = await mutateAsync({
      params: {
        document_name: docName,
        personality_name: userName,
      },
    });

    if (status === 200) {
      refetch();
    } else {
      toast.error(t('messages.somethingWentWrong'));
    }
  };

  return (
    <>
      {isFetching ? (
        <>
          {new Array(2).fill(1).map((_i, index) => (
            <DocumentListSkeleton key={index.toString()} />
          ))}
        </>
      ) : (
        <>
          <Typography variant="h5">
            {t('pages.chat.documents.documentList')}
          </Typography>
          <List>
            {data?.documents.map((doc, _) => (
              <ListItem
                key={doc.name}
                sx={{ pt: 1 }}
                secondaryAction={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(doc.name)}
                    >
                      {isPending ? (
                        <CircularProgress size={14} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={doc.name || ''} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default DocumentList;
