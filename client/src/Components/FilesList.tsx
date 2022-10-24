import { Box, List, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IFile } from "../types";
import File from "./File";

const FilesList = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  // const [folders, setFolders] = useState<IFolder[]>([]);

  async function load() {
    try {
      const response = await fetch("/api/files");
      const body = await response.json();
      setFiles(body.files as IFile[]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong fetching files!");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!files.length) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <List>
        {files.map(file => (
          <>
            <ListItem>
              <File file={file}/>
            </ListItem>
          </>
          ))}
      </List>
    </Box>
  );
};

export default FilesList;