import axios from "axios";
import { Server_URL, Items } from './APIOffer';

export const GetItems = async () => {
  const response = await axios.get(Server_URL + Items);
  return response.data;
};

export const deleteOffer = async (id) => {
  return await axios.delete(`${Server_URL}${Items}/${id}`);
};

export const updateOffer = async (id, newOffer) => {
  return await axios.put(`${Server_URL}${Items}/${id}`, newOffer);
};

export const addOffer = async (newOffer) => {
  return await axios.post(Server_URL+ Items, newOffer);
};
