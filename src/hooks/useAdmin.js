import { useQuery } from 'react-query';

import axios from '../config/axios';
import CONFIG_URLS from '../config/urls';

export default function useAdmin() {
  const allUsersQuery = useQuery(['allusers'], async () => {
    const { data } = await axios.get(`${CONFIG_URLS.base}/admin/users`);
    return data;
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  }, {
    initialData: [],
  });

  return {
    allUsers: allUsersQuery?.data || [],
    allUsersQuery,
  }
}