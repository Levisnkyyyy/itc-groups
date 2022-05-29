import CONFIG_URLS from '../config/urls';
import axios from "../config/axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usePet = (petId) => {
  const queryClient = useQueryClient();

  const updateInfo = useMutation(async (data) => axios.put(`${CONFIG_URLS.base}/users`, data), {
    onSuccess: (response) => {
      queryClient.refetchQueries(['user']);
      console.log(response.data, 'response success');
    },
  });


  const pet223Query = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d), {
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
