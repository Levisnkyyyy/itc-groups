import { useCallback, useEffect, useState } from "react";
import APIController from "../config/FirebaseController";
import { useMutation, useQuery } from 'react-query';
import CONFIG_URLS from "../config/urls";
import axios from "../config/axios";


export default function useAuth() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const user = useQuery('user', () => axios.get(`${CONFIG_URLS.base}/users/me`), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      console.log('d', data);
      setLoggedIn(data);
    },
    onError: () => {
      setLoggedIn(false);
    }
  });

  const signup = useMutation(async (data) => axios.post(`${CONFIG_URLS.base}/users`, data), {
    onSuccess: (response) => {
      console.log(response.data, 'response success');
      user.refetch();
    },
  })

  const login = useMutation(async (data) => axios.post(`${CONFIG_URLS.base}/users/login`, data), {
    onSuccess: (response) => {
      console.log(response.data, 'response success');
      user.refetch();
    },
  })

  const signout = useMutation(async () => axios.get(`${CONFIG_URLS.base}/users/logout`), {
    onSuccess: (response) => {
      console.log(response.data, 'response success');
      user.refetch();
    },
  })

  return {
    isLoggedIn,
    login,
    signout,
    signup,
  }
}