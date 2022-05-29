import { Box } from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';

export default function MenuItem({ to, label }) {
  const match = useMatch(to);
  return (
    <Box
      as={Link} // Read chakra-ui docs about the "as" property
      to={to} // href
      bgColor={match ? 'whiteAlpha.500' : "blue.500"}
      height="100%"
      padding="2"
      borderRadius="4px"
      fontWeight="500"
      marginRight="15px"
      transition="background-color 200ms ease"
      _hover={{
        backgroundColor: 'whiteAlpha.200',
      }}
    >
      {label}
    </Box>
  )
}