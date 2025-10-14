import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
import ActionAreaCard from "./cards"; // انتبه للمسار

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <ActionAreaCard />
      </Container>
    </ThemeProvider>
  );
}
