import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import FilesList from "./Components/FilesList";
import UploadForm from "./Components/UploadForm";
import { EPages } from "./types";
import "./basic.css"

function App() {

  function renderPage() {
    switch(window.location.pathname) {
      case EPages.FILES_LIST:
        return <FilesList />;
      case EPages.UPLOAD_FORM:
         return <UploadForm />;
      default:
        return <h1>Page not found.</h1>;
    }
  }

  const theme = createTheme({
    palette: {
      mode: "dark"
    },
    typography: {
      fontSize: 12,
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          <Typography style={{ textAlign: "center", width: "100%" }} variant="h2">Unlimited Storage!!</Typography>
          {renderPage()}
        </Box>
      </ThemeProvider>
  );
}

export default App;
