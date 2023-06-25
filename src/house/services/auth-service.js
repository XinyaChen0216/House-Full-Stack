import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL || "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    if (localStorage) localStorage.clear();
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    return response.data;
};

export const findAllUser = async () => {
    const response = await api.get(`${USERS_URL}/users`);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await api.get(`${USERS_URL}/users/${id}`);
    return response.data;
};

export const logout = async () => {
    if (localStorage) localStorage.clear();
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};
export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response.data;
};

export const viewOtherProfile = async (username) => {
    const response = await api.get(`${USERS_URL}/profile/${username}`);
    return response.data;
};

export const viewOtherProfileById = async (id) => {
    const response = await api.get(`${USERS_URL}/other/profile/${id}`);
    return response.data;
};

export const viewTopAgents = async () => {
    const response = await api.get(`${USERS_URL}/topagents`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};

export const register = async ({ username, password, email, role }) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username: username,
        password: password,
        email: email,
        role: role
    })
    return response.data;
};




