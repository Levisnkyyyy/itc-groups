import { Box, Spinner, Heading, Flex, Button } from '@chakra-ui/react';
import { useCallback, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PetCreator from '../pets/creator';
import AuthContext from '../../contexts/authContext';
import usePet from '../../hooks/usePet';

export default function PetPage() {
  const { petId } = useParams('petId');
  const { petQuery, updateStatus, petUpdateMutation } = usePet(petId);
  const { isLoggedIn: userInfo } = useContext(AuthContext);

  const changeStatus = useCallback((newStatus) => {
    updateStatus.mutate({ status: newStatus });
  }, [updateStatus]);

  const petIsAssignedToUser = useMemo(() => {
    
    return userInfo.fosteredPets.find((p) => p === petId) || userInfo.adoptedPets.find((p) => p === petId);
  }, [petId, userInfo]);
  return (
    <Box>
      {petQuery.isLoading && (
        <Spinner />
      )}

      {petQuery.data && (
        <Box>
          <Heading size="lg">{petQuery.data.name}</Heading>
          <Flex>
            <Box fontWeight="500">Status:</Box>
            <Box ms="1">{petQuery.data?.status}</Box>
            <>
              {petQuery.data.status !== 'fostered' && petQuery.data.status !== 'adopted' && (
                <Button onClick={() => changeStatus('fostered')}>
                  Foster
                </Button>
              )}
              {petQuery.data.status !== 'adopted' && (
                <Button onClick={() => changeStatus('adopted')}>
                  Adopt
                </Button>
              )}
              {petQuery.data.status !== 'not-adopted' && petIsAssignedToUser && (
                <Button onClick={() => changeStatus('not-adopted')}>
                  Return
                </Button>
              )}
            </>
          </Flex>
        </Box>
      )}

      {userInfo.accessLevel === 'admin' && (
        <Box>
          {petQuery?.data && (
            <PetCreator petData={petQuery.data} petUpdateMutation={petUpdateMutation} isEditting />
          )}
        </Box>
      )}

    </Box>
  )
}