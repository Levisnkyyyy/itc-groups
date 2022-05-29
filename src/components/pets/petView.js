import { Box, Button, IconButton, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

export default function PetView({ pet, isReadOnly, handlePetSaving, userInfo, deletePet }) {
  return (
    <Box
      key={pet._id}
      w="250px"
      h="400px"
      bgColor="gray.600"
      p="2"
      m="2"
    >
      {pet.image && (
        <img src={pet.image} />
      )}
      <Heading>
        <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
      </Heading>
      <Box>{pet.type}</Box>
      {!isReadOnly && (
        <Button
          onClick={() => handlePetSaving(pet._id)}
        >
          {userInfo.savedPets.includes(pet._id) ? (
            'Unsave'
          ) : (
            'Save'
          )}
        </Button>
      )}
      {!isReadOnly && (
        <IconButton
        isLoading={deletePet.isLoading}
        onClick={() => deletePet.mutate(pet._id)}
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="ghost"
      />
      )}
    </Box>
  )
}