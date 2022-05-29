import CONFIG_URLS from '../config/urls';
import axios from "../config/axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usePet = (petId) => {
  // const queryClient = useQueryClient();
  const petQuery = useQuery(['pet', petId], async () => {
    const { data } = await axios.get(`${CONFIG_URLS.base}/pets/${petId}`);
    return data;
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const updatePetStatus = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/petstatus`, d));

  return {
    petQuery,
    updatePetStatus,
  }
}

export default usePet;
