
/** NOTE SCHEMA 
 * 
 * {
 *    content: String,
 *    username: String,
 *    date: Date,
 * }
*/

import { useCallback, useContext, useEffect, useState } from "react";
import APIController from "../config/FirebaseController";
import AuthContext from "../contexts/authContext";


export default function useNotes() {
  const [myNotes, setMyNotes] = useState([]);
  const [filters, setFilters] = useState([]);
  const { displayName, userInfo } = useContext(AuthContext);

  const getNotesFromServer = useCallback(async () => {
    const notesList = await APIController.getAllNotes();
    setNotes(notesList);
  }, []);

  const addNewNote = useCallback(async (content) => {
    await APIController.addNewNote({
      username: displayName,
      userid: userInfo.uid,
      content,
      date: new Date().getTime()
    })
    // getNotesFromServer();
    return true;
  }, [displayName, userInfo]);

  const deleteNoteById = useCallback(async (id) => {
    await APIController.deleteNoteById(id);
    // getNotesFromServer();
  }, []);

  useEffect(() => {
    console.log('filters', filters);
    const unsubscribe = APIController.startObservingNotes(filters, (notesList) => {
      setNotes(notesList);
    });
    return unsubscribe;
  }, [filters]);
  

  return {
    notes,
    setFilters,
    filters,
    addNewNote,
    deleteNoteById
  }
}