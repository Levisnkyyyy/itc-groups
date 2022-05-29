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
      petQuery.refetch();
      queryClient.refetchQueries(['user'], { exact: true });
    }
  });

  const petUpdateMutation = useMutation((d) => axios.put(`${CONFIG_URLS.base}/pets/${petId}`, d), {
    onSuccess: () => {
      petQuery.refetch();
    }
  });

  return {
    petQuery,
    updateStatus,
    petUpdateMutation,
  }
}

export default usePet;
