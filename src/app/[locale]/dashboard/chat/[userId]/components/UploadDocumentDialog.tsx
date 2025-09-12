import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import FileUploadForm from '@/components/common/FileUploadForm';
import { Dialog } from '@/components/Dialog';
import { DialogProps } from '@/components/Dialog/Dialog';
import { uploadDocumentsat } from '@/services/upload-doc';
import { onInvalidSubmit } from '@/utils/form';
import { Box, Divider, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DocumentList from './DocumentList';
import { useParams } from 'next/navigation';

export type UploadDocumentDialogProps = DialogProps;

const UploadDocumentDialog: FC<UploadDocumentDialogProps> = ({ ...props }) => {
  const t = useTranslations();
  const params = useParams<{ userId: string }>();
  const userName = params.userId;

  const methods = useForm();
  const { handleSubmit } = methods;
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadDocumentsat,
  });

  const onSubmit = async (payload: any) => {
    const formData = new FormData();
    formData.append('personality_name', userName);

    Array.from(payload.files).forEach((file) => {
      formData.append('files', file as any);
    });

    try {
      const { data, status } = await mutateAsync({
        payload: formData,
      });
      if (status === 200) {
        props.onClose?.({}, 'backdropClick');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Dialog
      {...props}
      title={t('pages.chat.uploadDocument')}
      maxWidth="sm"
      sx={{ marginX: 'auto' }}
      dialogButtons={[]}
    >
      <FormProvider {...methods}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <Grid size={{ xs: 12 }}>
            <DocumentList />
            <Divider />
          </Grid>
          <Grid size={{ xs: 12 }} mt={3}>
            <FileUploadForm
              name="files"
              label="Do you have a file you'd like to share?"
              acceptedFormat=".pdf"
              acceptedFormatText="Supported formats: PDF"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <ButtonWithLoading
                isLoading={isPending}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                size="large"
              >
                {t('common.buttons.submit')}
              </ButtonWithLoading>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default UploadDocumentDialog;
