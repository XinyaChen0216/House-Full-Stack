import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};
export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response.data;
};

export const viewOtherProfile = async (username) => {
    const response = await api.get(`${USERS_URL}/profile/${username}`);
    console.log(response.data);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};
export const register = async ({ username, password, email, role }) => {
    console.log({
        username: username,
        password: password,
        email: email,
        role: role
    })
    console.log(`${USERS_URL}/register`)
    const response = await api.post(`${USERS_URL}/register`, {
        username: username,
        password: password,
        email: email,
        role: role
    })
    return response.data;
}


