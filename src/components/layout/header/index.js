import { Box, Flex, Button } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import routes from "../../../config/routes";
import AuthContext from "../../../contexts/authContext";
import MenuItem from "./menuItem";

export default function Header() {
  const { isLoggedIn, signout } = useContext(AuthContext);
  const isAdmin = useMemo(() => isLoggedIn.accessLevel === 'admin', [isLoggedIn]);
  const filterFunc = useMemo(() => {
    if (isAdmin) return (route) => !route.hidden && (route.protected || route.admin);
    if (isLoggedIn) return (route) => !route.hidden && (route.protected && !route.admin);
    return (route) => !route.hidden && !route.protected;
  }, [isAdmin, isLoggedIn]);
  return (
    <Flex
      align="center"
      bgColor="blue.500"
    >
      <Box>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Firebase_Logo.png" width="200" alt="logo" />
      </Box>
      <Flex>
        {routes.filter(filterFunc).map((route) => (
            <MenuItem key={route.path} to={route.path} label={route.label} />
        ))}
        {isLoggedIn && <Button onClick={() => signout.mutate()}>Sign out</Button>}
      </Flex>
    </Flex>
  )
}