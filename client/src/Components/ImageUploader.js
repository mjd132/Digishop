import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import React from "react";
import { useDropzone } from "react-dropzone";
const ImageUploader = ({ styles, onSubmit, acceptFiles, files, setFiles }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptFiles,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles((prevfiles) => {
        let newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        console.table(newFiles);
        return [...prevfiles, ...newFiles];
      });
      console.table(acceptedFiles);
    },
    onDropRejected: () => {
      enqueueSnackbar("اسناد با پسوند غیر مجاز افزوده نشد !", {
        variant: "error",
      });
    },
  });

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <Box sx={{ ...dropzoneStyles, ...styles }}>
      <Box
        {...getRootProps()}
        sx={{ p: 5, cursor: "pointer", borderBottom: "1px solid " + grey[400] }}
      >
        <input {...getInputProps()} />
        <Typography sx={{ textAlign: "center" }}>
          اسناد را به اینجا بکشید و یا انتخاب کنید.
        </Typography>
      </Box>
      {files.length > 0 ? (
        <>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            {files.map((file, index) => (
              <Box sx={thumb} key={index}>
                <Box sx={thumbInner}>
                  <img alt={file.path} src={file.preview} style={img} />
                </Box>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    handleRemoveImage(index);
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: 14,
                      color: grey[900],
                      backgroundColor: grey[100],
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
          {onSubmit && (
            <Button
              onClick={() => {
                onSubmit(files);
              }}
              sx={{ my: 1 }}
              width="fit-content"
              variant="outlined"
            >
              آپلود اسناد
            </Button>
          )}
        </>
      ) : (
        <Typography fontSize={12} fontWeight={300} marginY={1}>
          سندی برای نمایش وجود ندارد
        </Typography>
      )}
    </Box>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",

  px: 2,
  mb: 1,
  textAlign: "center",
};
const thumb = {
  position: "relative",
  display: "flex",
  borderRadius: 2,
  border: "1px solid",
  borderColor: grey[600],
  marginBottom: 1,
  marginLeft: 1,
  width: "auto",
  height: 100,
  padding: 0.5,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  aspectRatio: 2 / 3,
};
export default ImageUploader;
