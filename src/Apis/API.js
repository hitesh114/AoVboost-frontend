import axios from "axios";
import { API_URL, url } from './APIOffer';

export const fetchData = async () => {
  const response = await axios.get(API_URL +  url);
  return response.data;
};

export const deleteOffer = async (id) => {
  return await fetch(`${API_URL}${url}/${id}`, { method: "DELETE" });
};

export const updateOffer = async (id, newOffer) => {
  return await axios.put(`${API_URL}${url}/${id}`, newOffer);
};

export const addOffer = async (newOffer) => {
  return await axios.post(API_URL+ url, newOffer);
};
