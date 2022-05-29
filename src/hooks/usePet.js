import CONFIG_URLS from '../config/urls';
import axios from "../config/axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usePet = (petId) => {
  // const queryClient = useQueryClient();

  return {
    petQuery,
    updatePetStatus,
  }
}

export default usePet;
