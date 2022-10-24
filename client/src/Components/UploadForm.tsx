import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { useState } from "react";
import DragAndDropFiles from "./DragAndDropFiles";
import FileFormItem from "./FileFormItem";

const UploadForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  async function handleSubmit() {
    try {
      setIsUploading(true);
      const formData = new FormData();
      files.forEach(file => formData.append("files", file, file.name));
      const requestOptions: RequestInit = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
      await fetch("/api/upload", requestOptions);
      window.location.href = "/files/view";
    } catch (err) {
      alert("Something went wrong uploading the files!");
    } finally {
      setIsUploading(false);
    }
  }

  if (isUploading) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap">
      {files.length ? (
        <List>
          <ListItem>
            <Box>
              {files.map((file, i) => <FileFormItem
                key={i + '-' + Math.floor(Math.random() * 100000)}
                index={i}
                file={file}
                onChange={({ file, fileName }) => {
                  setFiles((prevState) => ([
                    ...prevState.slice(0, i),
                    {
                      ...file,
                      name: fileName
                    },
                    ...prevState.slice(i + 1)
                  ]))
                }}
                removeFile={() => setFiles([
                  ...files.slice(0, i),
                  ...files.slice(i + 1)
                  ])}
                />)}
            </Box>
          </ListItem>
          <ListItem>
            <Button
              size="large"
              variant="outlined"
              onClick={handleSubmit}
              >
              Upload!
            </Button>
          </ListItem>
        </List>
      ) : (
        <DragAndDropFiles onChange={(files) => {
          setFiles(files);
        }}/>
      )}
    </Box>
  );
};

export default UploadForm;