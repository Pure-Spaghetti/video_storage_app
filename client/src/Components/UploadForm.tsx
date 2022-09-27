import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, CSSProperties } from "react";

interface IFormState {
  fileName: string,
  file: string
};

const UploadForm = () => {
  const [formState, setFormState] = useState<IFormState>({
    fileName: "",
    file: ""
  });

  async function handleSubmit() {
    console.log("Submitting", formState);
  }

  const formItemStyles: CSSProperties = { margin: "16px 0 16px 0", width: "100%", textAlign: "center" };

  return (
    <Box display="flex" flexWrap="wrap">
      <Box
        style={formItemStyles}
      >
        <Input
          type="text"
          placeholder="File Name"
          onChange={(e) => setFormState((prevState) => ({
            ...prevState,
            fileName: e.target.value
          }))}
        />
      </Box>
      <Box
        style={formItemStyles}
      >
        <Input
          type="file"
          onChange={(e) => setFormState((prevState) => ({
            ...prevState,
            file: e.target.value
          }))}
        />
      </Box>
      <Box
        style={formItemStyles}
      >
        <Button
          onClick={handleSubmit}
          >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UploadForm;