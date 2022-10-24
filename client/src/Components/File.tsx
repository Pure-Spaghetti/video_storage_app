import { Card, IconButton, List, ListItem, Typography } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { IFile } from "../types";

interface IProps {
  file: IFile,
};

const File = ({ file }: IProps) => {

  return (
    <Card style={{
      width: "500px",
      height: "100px"
    }}>
      <List>
        <ListItem>
          <Typography>ID: {file.id}</Typography>
          <IconButton>
            <FileDownload />
          </IconButton>
        </ListItem>
        <ListItem>
          <Typography noWrap>Name: {file.name}</Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default File;