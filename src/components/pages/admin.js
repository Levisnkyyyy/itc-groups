import { Box, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import UserProfile from "../admin/userProfile";

export default function AdminPage() {
  const { allUsers } = useAdmin();
  const [activeUserModal, setUserModal] = useState(null);
  return (
    <Box>
      <Heading>Users</Heading>
      <Box>
        {allUsers && allUsers.map((user) => (
          <Flex onClick={() => setUserModal(user)} key={user._id}>
             <Box>{user._id}</Box>
            <Box>{user.email}</Box>
          </Flex>
        ))}
      </Box>
      {activeUserModal && (
        <UserProfile user={activeUserModal} onClose={() => setUserModal(null)} />
      )}
    </Box>
  )
}