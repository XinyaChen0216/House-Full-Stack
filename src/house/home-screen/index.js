import React from "react";
import HouseList from "../houses/houseList";
import PostHouse from "../post-house/index";
import Search from "../search/index";
import { useSelector } from "react-redux";

const HomeScreen = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <h4>Home</h4>
                {currentUser && currentUser["role"] === "agent" && <PostHouse />}
            </div>
            <Search />
            <HouseList />
        </>
    );
};
export default HomeScreen;
