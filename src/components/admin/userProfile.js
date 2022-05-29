import {
  Modal,
  ModalOverlay, Flex,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  Box,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import PetView from '../pets/petView';

export default function UserProfile({ user, onClose }) {
  const ownedPets = useMemo(() => {
    return [...user.fosteredPets, ...user.adoptedPets];
  }, [user]);
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading>{user.email}</Heading>
          <Box>{user.bio}</Box>

          <Heading mt="5" size="sm">Owned pets</Heading>
          <Flex flexWrap="wrap">
            {ownedPets.length === 0 && 'NO PETS'}
            {ownedPets.map((pet) => (
              <PetView pet={pet} isReadOnly />
            ))}
          </Flex>

          <Heading mt="5" size="sm">Saved pets</Heading>
          <Flex flexWrap="wrap">
            {user.savedPets.map((pet) => (
              <PetView pet={pet} isReadOnly />
            ))}
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}