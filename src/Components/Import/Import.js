import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Import = () => {
  const userId = useSelector((reduxState) => reduxState.userId);
  if (!userId) {
    return <Redirect to="/login" />;
  }
  return (
    <Box>
      <Container>
        <Box pt={4} pb={4}>
          <Typography variant="h4">Import players data</Typography>
          <Typography>
            Soccer goalie defender upper 90 hat trick referee forward pitch
            halftime one-two African Cup of Nations midfielder chip goal number
            10 red card. Defender brace referee soccer hat trick goal upper 90
            center-half three-five-two number 10 African Cup of Nations pitch
            halftime goalie forward red card.
          </Typography>
          <Box
            sx={{ border: " solid 2px gray", borderRadius: "6px" }}
            p={6}
            mt={3}
            mb={4}
          >
            <Button variant="outlined" startIcon={<UploadFileIcon />}>
              Upload file...
            </Button>
          </Box>
          <Button variant="contained">Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Import;
