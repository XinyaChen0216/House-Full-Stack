import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

import axios from "axios";
const API_BASE =
  process.env.REACT_APP_SERVER_API_URL || "http://localhost:4000/api";
const HOUSE_API = `${API_BASE}/houses`;

export const createHouse = async (house) => {
  const street = house.address.trim().split(" ").join("%20");
  const address = `${street}%20${house.city.trim()}%20${house.state.trim()}`;
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );
  house.latitude = res.data.results[0].geometry.location.lat;
  house.longitude = res.data.results[0].geometry.location.lng;
  const response = await axios.post(HOUSE_API, house);
  return response.data;
};

export const uploadimages = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    `${HOUSE_API}/images/upload`,
    formData,
    config
  );
  return response.status;
};

export const findPublicHouses = async () => {
  const config = {
    method: "get",
    url: "https://us-real-estate.p.rapidapi.com/v3/for-sale?state_code=WA&sort=newest&limit=10property_type=single_family",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    },
  };
  const response = await axios(config);
  const publicHouses = response.data.data.home_search.results;
  let modPublicHouses = [];
  if (publicHouses.length > 0) {
    publicHouses.map(item => {
      let curr = {
        _id: item.property_id,
        address: item.location.address.line,
        city: item.location.address.city,
        state: item.location.address.state_code,
        zipcode: item.location.address.postal_code,
        bedrooms: item.description.beds,
        bathrooms: item.description.baths,
        size: item.description.sqft,
        price: item.list_price,
        type: item.description.type,
        year: item.description.year_built,
        status: "active",
        images:
          item.photos && item.photos.length > 0
            ? item.photos.map((photo) => photo.href)
            : ["/images/house1.jpeg"],
        date_posted: new Date(item.list_date),
        overview: item.tags.toString(),
        latitude: item.location.address.coordinate.lat,
        longitude: item.location.address.coordinate.lon,
        agent: "64938373230f0cc1060ccf65",
        isPublic: true,
      };
      modPublicHouses.push(curr);
    });
  }
  return modPublicHouses;
};

export const findPublicHouseById = async (id) => {
  const config = {
    method: "get",
    url: `https://us-real-estate.p.rapidapi.com/v2/property-detail?property_id=${id}`,
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
    },
  };
  const response = await axios(config);
  const publicHouse = response.data.data.property_detail;
  let modPublicHouse = {
    _id: id,
    address: publicHouse.address.line,
    city: publicHouse.address.city,
    state: publicHouse.address.state_code,
    zipcode: publicHouse.address.postal_code,
    bedrooms: publicHouse.public_records[0].beds,
    bathrooms: publicHouse.public_records[0].baths,
    size: publicHouse.public_records[0].sqft,
    price: publicHouse.prop_common.price,
    type: publicHouse.public_records[0].prop_type,
    year: publicHouse.public_records[0].year_built,
    status: "active",
    images:
      publicHouse.photos && publicHouse.photos.length > 0
        ? publicHouse.photos.map((photo) => photo.href)
        : ["/images/house1.jpeg"],
    date_posted: new Date(publicHouse.prop_common.list_date_raw),
    overview: publicHouse.search_tags.toString(),
    latitude: publicHouse.address.location.lat,
    longitude: publicHouse.address.location.lon,
    agent: "64938373230f0cc1060ccf65",
    isPublic: true,
  };
  console.log(modPublicHouse);
  return modPublicHouse;
};

export const findHouses = async () => {
  const response = await axios.get(HOUSE_API);
  const houses = response.data;
  return houses;
};

export const deleteHouse = async (hid) => {
  const response = await axios.delete(`${HOUSE_API}/${hid}`);
  return response.data;
};

export const updateHouse = async (house) => {
  const response = await axios.put(`${HOUSE_API}/${house._id}`, house);
  return house;
};

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials) => {
    const user = await authService.login(credentials);
    return user;
  }
);
