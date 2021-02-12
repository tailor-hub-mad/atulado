import axios from "axios";
import useSWR from "swr";

import { API_BASE_URL, API_KEY } from "../utils/constants";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    apiKey: API_KEY,
  },
});

const fetcher = (path) => {
  return axiosInstance.get(path).then((response) => response.data);
};

export const postConnector = (path, data = {}) => {
  return axiosInstance.post(path, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getConnector = (path) => {
  return axiosInstance.get(path);
};

export const swrConnector = (path) => {
  const { data, error } = useSWR(path, fetcher);
  return { data, error };
};
