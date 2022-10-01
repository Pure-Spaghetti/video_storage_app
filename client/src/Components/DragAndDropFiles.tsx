import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileIcon from "@mui/icons-material/FileUpload"
import { useEffect } from "react";

interface IProps {
  onChange: (files: File[]) => void,
}

function DragAndDropFiles({ onChange }: IProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});

  useEffect(() => {
    onChange(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <Box border="2px dashed black" display="flex" justifyContent="center" height="250px" width="500px" {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography>
          {isDragActive ? "Release to set files" : "Drag'n Drop files" }
        </Typography>
        <FileIcon style={{ fontSize: "50px", width: "100%" }} />
      </Box>
    </Box>
  );
}

export default DragAndDropFiles;