import { Routes, Route } from "react-router";
import NavigationSidebar from "./navigation-sidebar";
import HomeScreen from "./home-screen";
import ProfileScreen from "./user/profile-screen";
import OtherProfileScreen from "./user/other-profile-screen";
import WhoToFollowList from "./top-agents-list";
import whoReducer from "./reducers/who-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import houseReducer from "./reducers/houses-reducer";
import authReducer from "./reducers/auth-reducer";
import RegisterScreen from "./user/register-screen";
import LoginScreen from "./user/login-screen";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import Search from "./search"
import FollowerList from "./followers-list";
import AdvertisementScreen from "./user/advertisement-screen";

const persistConfig = {
    key: "root",
    storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        who: whoReducer,
        houses: houseReducer,
        user: persistedAuthReducer,
    },
    middleware: [thunk],
});

const persistor = persistStore(store);

function House() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <div className="row">
                        <div className="col-xl-2 col-1">
                            <NavigationSidebar />
                        </div>
                        <div className="col-xl-6 col-lg-7 col-11">
                            <Routes>
                                <Route path="/home" element={<HomeScreen />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/profile" element={<ProfileScreen />} />
                                <Route path="/profile/*" element={<OtherProfileScreen />} />
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/register" element={<RegisterScreen />} />
                                <Route path="advertisement" element={<AdvertisementScreen />} />

                            </Routes>
                        </div>
                        <div className="col-4 d-none d-md-none d-lg-block">
                            <WhoToFollowList />
                            <FollowerList />
                        </div>
                    </div>
                </div>
            </PersistGate>
        </Provider>
    );
}
export default House;
