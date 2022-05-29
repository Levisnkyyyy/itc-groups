import { Box, Button, Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { where } from 'firebase/firestore';
import { useCallback, useContext, useMemo } from "react";
import AuthContext from "../../contexts/authContext";
import NotesContext from "../../contexts/notesContext";
import Note from "./note";

export default function NoteList() {
  const { notes, setFilters, filters } = useContext(NotesContext);
  const { userInfo } = useContext(AuthContext);

  const isShowingMyTweets = useMemo(() => {
    return !!filters.find((filter) => filter.property === 'userid');
  }, [filters]);

  const toggleShowingMyTweets = useCallback(() => {
    const { uid } = userInfo;
    if (isShowingMyTweets) {
      setFilters((cur) => cur.filter((filter) => filter.property !== 'userid'));
    } else {
      setFilters((cur) => [...cur, {
        property: 'userid',
        operator: '==',
        value: uid,
      }]);
    }
  }, [setFilters, isShowingMyTweets, userInfo]);
  return (
    <Box>
      <Flex align="center" justify="center">
        <Button variant={isShowingMyTweets ? 'solid' : 'outline'} colorScheme={isShowingMyTweets ? 'blue' : 'gray'} onClick={toggleShowingMyTweets}>
          {isShowingMyTweets ? 'Showing my tweets' : 'Showing all tweets'}
        </Button>
      </Flex>
      <AnimatePresence>
        {notes.map((note) => (
          <Note key={note.id} {...note}>
            {note.content}
          </Note>
        ))}
      </AnimatePresence>
    </Box>
  )
}