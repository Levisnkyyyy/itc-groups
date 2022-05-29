import CONFIG_URLS from '../config/urls';
import axios from "../config/axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usePet = (petId) => {
  const queryClient = useQueryClient();
  const petQuery = useQuery(['pet', petId], async () => {
    const { data } = await axios.get(`${CONFIG_URLS.base}/pets/${petId}`);
    return data;
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const updateStatus = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d), {
    onSuccess: () => {
      console.log('ON SUCCESS');
    }
  });

  return {
    petQuery,
    updateStatus,
  }
}

export default usePet;
