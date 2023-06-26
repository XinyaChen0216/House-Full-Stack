import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

import axios from "axios";
const API_BASE =
    process.env.REACT_APP_SERVER_API_URL || "http://localhost:4000/api";
const AD_API = `${API_BASE}/advertisements`;

export const createAdvertisement = async (ad) => {
    const response = await axios.post(AD_API, ad);
    return response.data;
};

export const findAdvertisements = async () => {
    const response = await axios.get(AD_API);
    const ads = response.data;
    return ads;
};

export const deleteAdvertisement = async (ad_id) => {
    const response = await axios.delete(`${AD_API}/${ad_id}`);
    return response.data;
};

export const updateAdvertisement = async (ad) => {
    const response = await axios.put(`${AD_API}/${ad._id}`, ad);
    return ad;
};

export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);