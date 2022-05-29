import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, where } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRsD9v-p0UMTyuM2OjYzBZ2hdSe3fGEv8",
  authDomain: "fire-integration-2.firebaseapp.com",
  projectId: "fire-integration-2",
  storageBucket: "fire-integration-2.appspot.com",
  messagingSenderId: "852056032229",
  appId: "1:852056032229:web:06cf0a8a1269ecada5e50c",
  measurementId: "G-2P9W8DWVMH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const NOTES_DB = collection(db, "notes");
const auth = getAuth();

const APIController = {
  signup: async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return userCredential.user;
  },
  updateDisplayName: async (displayname) => {
    await updateProfile(auth.currentUser, {
      displayName: displayname,
    })
  },
  startObservingNotes: (filters, callback) => {
    const q = query(NOTES_DB, orderBy('date', 'desc'), ...filters.map((item) => where(item.property, item.operator, item.value)));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(notes);
    });
    return unsubscribe;
  },
  startObservingAuthCheck: (callback) => {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },
  signOut: async () => {
    await signOut(auth);
  },
  getAllNotes: async () => {
    const querySnapshot = await getDocs(NOTES_DB);
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return notes;
  },
  addNewNote: async ({ content, username, userid, date }) => {
    const docRef = await addDoc(NOTES_DB, {
        content: content.split(' '),
        username,
        userid,
        date,
    });
    console.log(docRef, 'created');
  },
  deleteNoteById: async (id) => {
    await deleteDoc(doc(db, "notes", id));
  }
}

export default APIController;
