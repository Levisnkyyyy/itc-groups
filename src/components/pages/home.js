import { Box } from "@chakra-ui/react";
import usePets from "../../hooks/usePets";
import PetPage from './pet';
import { Outlet, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import PetCreator from "../pets/creator";
import PetsList from "../pets/petsList";
import SearchPets from "../pets/search";

export default function HomePage() {
  const { addNewPet, filter, setFilter, data, deletePet } = usePets();
  const { isLoggedIn: userInfo } = useContext(AuthContext);
  return (
    <Box>
      {userInfo?.accessLevel === 'admin' && (
        <PetCreator mutation={addNewPet} />
      )}
      <SearchPets submitHandler={(v) => setFilter(v)} />
      <PetsList data={data} deletePet={deletePet} />
    </Box>
  );
}