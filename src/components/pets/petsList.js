import { Box, Heading, Flex, Button, IconButton } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useContext, useCallback, useState, useMemo } from "react";
import useUser from '../../hooks/useUser';
import AuthContext from "../../contexts/authContext";
import { DeleteIcon } from "@chakra-ui/icons";
import PetView from "./petView";

export default function PetsList({ data, deletePet }) {
  const [isShowingAll, setShowingAll] = useState(true);
  const { isLoggedIn: userInfo } = useContext(AuthContext);
  const { updateInfo } = useUser();

  const handlePetSaving = useCallback((id) => {
    updateInfo.mutate({
      savedPets: userInfo.savedPets.includes(id) ? userInfo.savedPets.filter((p) => p !== id) : [...userInfo.savedPets, id],
    })
  }, [userInfo, updateInfo]);

  const finalList = useMemo(() => data.filter((pet) => isShowingAll === false ? userInfo.savedPets.includes(pet._id) : true), [userInfo, data, isShowingAll]);

  return (
    <Box>
      <Button
        colorScheme={isShowingAll ? 'gray' : 'blue'}
        onClick={() => setShowingAll(!isShowingAll)}
      >
        {isShowingAll ? 'Showing all pets' : 'Showing saved pets'}
      </Button>
      <Flex flexWrap="wrap">
      {data && (
        finalList.map((pet) => (
          <PetView pet={pet} deletePet={deletePet} handlePetSaving={handlePetSaving} userInfo={userInfo} />
        ))
      )}
    </Flex>
    </Box>
  )
}