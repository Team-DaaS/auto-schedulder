import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Box>
      <Container>
        <Box p={4}>
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
