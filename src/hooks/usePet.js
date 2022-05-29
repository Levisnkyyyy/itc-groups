import CONFIG_URLS from '../config/urls';
import axios from "../config/axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usePet = (petId) => {
  // const queryClient = useQueryClient();
  const petQuery = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d), {
    onSuccess: () => {
      console.log('ON SUCCESS');
    }
  });

  const updateStatus = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d), {
    onSuccess: () => {
      console.log('ON SUCCESS');
    }
  });

  return {
    petQuery,
    updatePetStatus,
  }
}

export default usePet;
