import { Avatar, Box, Divider, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import NotesContext from '../../contexts/notesContext';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Note({ content, id, username, date }) {
  const { deleteNoteById } = useContext(NotesContext);
  const [isLoading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deleteNoteById(id);
  }
  return (
    <MotionBox initial={{ height: '0', opacity: 0, overflow: 'hidden' }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: '0', opacity: 0 }}>
      <Box
        borderRadius="4px"
        maxWidth="700px"
        margin="20px auto"
        bgColor="gray.700"
        boxShadow="base" // https://chakra-ui.com/docs/features/style-props
        _hover={{
          '.note_footer': {
            opacity: 1,
          }
        }}
      >
        <Flex padding="4" align="center" justify="space-between">
          <Flex align="center">
            <Avatar name={username} />
            <Box
              ps="3" // padding start - (equals to padding left, if our site was RTL, it was equal to padding right)
              fontWeight="500"
              fontSize="1.3rem"
            >
              {username}
            </Box>
          </Flex>
          <Box textColor="gray.500">
            {new Date(parseInt(date, 10)).toString()}
          </Box>
        </Flex>
        <Divider />
        <Box padding="4">
          {content.join(' ')}
        </Box>
        <Flex
          className="note_footer"
          opacity="0"
          transition="opacity 200ms ease"
          padding="1"
          justify="flex-end"
        >
          <IconButton isLoading={isLoading} onClick={handleDelete} size="sm" variant="ghost" colorScheme="red" icon={<DeleteIcon />} />
        </Flex>
      </Box>
    </MotionBox>
  )
}