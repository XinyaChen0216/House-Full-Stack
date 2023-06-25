import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";
import * as service from "./ad-service";

export const findAdsThunk = createAsyncThunk(
    "ad/findAd",
    async () => await service.findAdvertisements()
);

export const deleteAdThunk = createAsyncThunk(
    "ad/deleteAd",
    async (adid) => {
        await service.deleteAdvertisement(adid);
        return adid;
    }
);

export const createAdThunk = createAsyncThunk(
    "ad/createAd",
    async (ad) => {
        const newAd = await service.createAdvertisement(ad);
        return newAd;
    }
);

export const uploadImagesThunk = createAsyncThunk(
    "ads/images/upload",
    async (formData) => {
        const res = await service.uploadimages(formData);
        return res.status;
    }
);

export const updateAdThunk = createAsyncThunk(
    "ads/updateAd",
    async (ad) => await service.updateAdvertisement(ad)
);

export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);
