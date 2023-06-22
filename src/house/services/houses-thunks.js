import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";
import * as service from "./houses-service"

export const findHousesThunk = createAsyncThunk(
    "houses/findHouses",
    async () => await service.findHouses()
)

export const deleteHouseThunk = createAsyncThunk(
    'houses/deleteHouse',
    async (houseId) => {
        await service.deleteHouse(houseId)
        return houseId
    }
)

export const createHouseThunk = createAsyncThunk(
    'houses/createHouse',
    async (house) => {
        const newHouse = await service.createHouse(house)
        return newHouse
    }
)

export const updateHouseThunk =
    createAsyncThunk(
        'houses/updateHouse',
        async (house) =>
            await service.updateHouse(house)
    )

export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);




