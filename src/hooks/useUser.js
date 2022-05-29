import { useMutation, useQueryClient } from "react-query";
import axios from '../config/axios';
import CONFIG_URLS from '../config/urls';

export default function useUser() {
  const queryClient = useQueryClient();
  const updateInfo = useMutation(async (data) => axios.put(`${CONFIG_URLS.base}/users`, data), {
    onSuccess: (response) => {
      queryClient.refetchQueries(['user']);
      console.log(response.data, 'response success');
    },
  });

  return {
    updateInfo,
  }
}