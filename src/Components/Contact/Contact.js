import React from "react";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Box>
      <Container>
        <Box p={4}>
          <Typography component="h1" variant="h3" mt={4} mb={4}>
            Contact Us
          </Typography>
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
