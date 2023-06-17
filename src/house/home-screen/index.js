import React from "react";
import HouseList from "../houses/houseList";
import WhatsHappening from "../whats-happening/index";
import Search from "../search/index"
import { useSelector } from "react-redux";


const HomeScreen = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <>
            <h4>Home</h4>
            <Search />
            {currentUser && <WhatsHappening />}
            <HouseList />
        </>
    );
};
export default HomeScreen;
