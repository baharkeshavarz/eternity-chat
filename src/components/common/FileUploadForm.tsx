'use client';

import { Box, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FileUploadFormProps = {
  name: string;
  label: string;
  subLabel?: string;
  chooseFileText?: string;
  acceptedFormat: string;
  acceptedFormatText: string;
};

const FileUploadForm: FC<FileUploadFormProps> = ({
  name,
  label,
  subLabel = '',
  chooseFileText = 'Choose File',
  acceptedFormat,
  acceptedFormatText,
}) => {
  const { control } = useFormContext();
  const [fileName, setFileName] = useState('No file chosen');
  const [filePreview, setFilePreview] = useState<string | null>(null);

  return (
    <Box width="100%">
      <Typography variant="h5" mb={1}>
        {label}
      </Typography>

      {subLabel && (
        <Typography variant="body1" mb={1}>
          {subLabel}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={undefined}
        render={({ field }) => {
          const handleChange = (e: any) => {
            const files = e.target.files;
            field.onChange(files);
          };
          return (
            <Box
              component="label"
              htmlFor={`upload-${name}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '50px',
                overflow: 'hidden',
                width: '100%',
                cursor: 'pointer',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#5a5a5a',
                  color: '#fff',
                  padding: '10px 20px',
                  whiteSpace: 'nowrap',
                }}
              >
                {chooseFileText}
              </Box>
              <Box
                sx={{
                  padding: '10px 20px',
                  backgroundColor: '#f9f9f9',
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {fileName}
              </Box>
              <input
                name={field.name}
                type="file"
                id={`upload-${field.name}`}
                accept={acceptedFormat}
                hidden
                aria-label={label}
                onChange={handleChange}
                multiple={true}
              />
            </Box>
          );
        }}
      />

      <Typography variant="body2" color="textSecondary" my={2}>
        {acceptedFormatText}
      </Typography>

      {/* {filePreview && (
        <Box
          mt={2}
          p={1}
          sx={{
            border: '1px solid #f3f3f3',
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
          }}
        >
          <img
            src={filePreview}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: '8px',
              transition: '0.3s ease-in-out',
            }}
          />
        </Box>
      )} */}
    </Box>
  );
};

export default FileUploadForm;
