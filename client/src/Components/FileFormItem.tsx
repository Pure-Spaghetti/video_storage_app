import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";

interface IFormState {
  fileName: string,
  file: File
};

interface IProps {
  index: number,
  onChange: (formState: IFormState) => void,
  removeFile: () => void,
  file: File
}

const FileFormItem = ({ onChange, index, removeFile, file }: IProps) => {
  const [fileDetailsArray, setFileDetailsArray] = useState<{ key: string, value: string }[]>([]);
  const ignoredKeys: string[] = [
    "webkitRelativePath",
    "arrayBuffer",
    "slice",
    "stream",
    "text",
    "lastModified",
    "lastModifiedDate",
  ];

  useEffect(() => {
    let fileDetails: { key: string, value: string }[] = [];
    for (const key in file) {
      if (!ignoredKeys.includes(key)) {
        fileDetails.push({ key, value: String(file[key as keyof File]) })
      }
    }
    setFileDetailsArray(fileDetails);
  }, []);

  return (
    <Box m={1}>
      <Card style={{ width: "800px" }} variant="outlined">
        <List>
          <ListItem>
            <IconButton style={{ position: "absolute" }} onClick={removeFile}>
              <Close />
            </IconButton>
          </ListItem>
          {fileDetailsArray.map(({ key, value }, i) => (
            <ListItem  key={i + '-' + Math.floor(Math.random() * 100000)}>
              <Typography noWrap>
                {`${key}: ${value}`}
              </Typography>
            </ListItem>
          ))}
          {
            file.type.match("video") ? (
              <ListItem>
                <video controls style={{ width: "100%" }}>
                  <source
                    type="video/mp4"
                    src={URL.createObjectURL(file)}
                  />
                </video>
              </ListItem>
            ) : file.type.match("audio") ? (
              <ListItem>
                <audio controls style={{ width: "100%" }}>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </audio>
              </ListItem>
            ) : file.type.match("image") ? (
              <ListItem>
                <img
                  style={{ width: "100%" }}
                  alt="image_preview"
                  src={URL.createObjectURL(file)}
                />
              </ListItem>
            ) : undefined
          }
        </List>
      </Card>
      </Box>
  );
};

export default FileFormItem;
