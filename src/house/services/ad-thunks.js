import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";
import * as service from "./ad-service";

export const findAdsThunk = createAsyncThunk(
    "ad/findAd",
    async () => await service.findAds()
);

export const deleteAdThunk = createAsyncThunk(
    "ad/deleteAd",
    async (adid) => {
        await service.deleteAd(adid);
        return adid;
    }
);

export const createAdThunk = createAsyncThunk(
    "ad/createAd",
    async (ad) => {
        const newAd = await service.createAd(ad);
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
    async (ad) => await service.updateAd(ad)
);

export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);
