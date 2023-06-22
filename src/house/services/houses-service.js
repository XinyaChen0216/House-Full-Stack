import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

import axios from 'axios';
const API_BASE = process.env.REACT_APP_SERVER_API_URL || "http://localhost:4000/api";
// const HOUSE_API = 'http://localhost:4000/api/house';
const HOUSE_API = `${API_BASE}/houses`;

export const createHouse = async (house) => {
    const response = await axios.post(HOUSE_API, house)
    return response.data;
}

export const findHouses = async () => {
    const response = await axios.get(HOUSE_API);
    const houses = response.data;
    return houses;
}

export const deleteHouse = async (hid) => {
    const response = await axios.delete(`${HOUSE_API}/${hid}`)
    return response.data
}

export const updateHouse = async (house) => {
    const response = await axios
        .put(`${HOUSE_API}/${house._id}`, house);
    return house;
}

export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

