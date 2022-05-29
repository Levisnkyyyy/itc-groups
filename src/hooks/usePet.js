import { useMutation, useQuery } from 'react-query';
import CONFIG_URLS from "../config/urls";
import axios from "../config/axios";
import { useState } from 'react';

export default function usePets() {
  const [filter, setFilter] = useState([]);
  const { data, isLoading, refetch: refetchPets } = useQuery(['pets', filter.map((f) => ({ ...f, id: undefined }))], async () => {
    if (filter.length > 0) {
      const response = await axios.post(`${CONFIG_URLS.base}/pets/search`, filter);
      return response.data;
    }
    const response = await axios.get(`${CONFIG_URLS.base}/pets`);
    return response.data;
  }, {
    placeholderData: [],
    cacheTime: 60 * 60 * 60,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  const addNewPet = useMutation((d) => axios.post(`${CONFIG_URLS.base}/pets`, d), {
    onSuccess: () => {
      refetchPets();
    }
  });

  const deletePet = useMutation((petId) => axios.delete(`${CONFIG_URLS.base}/pets/${petId}`), {
    onSuccess: () => {
      refetchPets();
    }
  })

  return {
    filter,
    setFilter,
    data,
    isLoading,
    addNewPet,
    deletePet,
  }
}