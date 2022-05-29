import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import NotesContext from "../../contexts/notesContext";

export default function NoteAdder() {
  const { displayName } = useContext(AuthContext);
  const { addNewNote } = useContext(NotesContext);
  const toast = useToast();
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(false);

  const addNoteHandler = async () => {
    if (!content) {
      return toast({
        status: 'error',
        title: 'Enter note text',
        position: 'top',
        duration: 3500,
        variant: 'solid',
        isClosable: true,
      });
    }
    setLoading(true);
    await addNewNote(content);
    setLoading(false);
    toast({
      status: 'success',
      title: 'Note added',
      position: 'top',
      duration: 3500,
      variant: 'solid',
      isClosable: true,
    });
  }

  return (
    <Box
      borderRadius="4px"
      maxWidth="700px"
      margin="20px auto"
      padding="3"
      bgColor="gray.700"
      boxShadow="base" // https://chakra-ui.com/docs/features/style-props
    >
      <Flex align="center" textColor="gray.500">
        <Box>
          Posting as
        </Box>
        <Box ps="1" textColor="gray.400" fontStyle="italic">
          {displayName}
        </Box>
      </Flex>
      <Textarea
        placeholder="Enter your note"
        boxShadow="base"
        border="0"
        bgColor="gray.600"
        minH="130px"
        mt="4" // margin top
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button isLoading={isLoading} onClick={addNoteHandler} mt="3" width="100%" colorScheme="blue">Save</Button>
    </Box>
  )
}