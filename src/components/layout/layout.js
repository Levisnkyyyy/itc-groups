import { Box } from "@chakra-ui/react";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <Box className="layout">
      <Header />
      {children}
    </Box>
  )
}