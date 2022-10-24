import { Link, Box } from "@mui/material";

const Nav = () => {
  return (
    <Box display="flex" width="100%">
      {window.location.pathname !== "/files/upload" && (
        <Link href="/files/upload">
          Upload
        </Link>
      )}
      {window.location.pathname !== "/files/view" && (
        <Link href="/files/view">
          Files
        </Link>
      )}
    </Box>
  );
};

export default Nav;