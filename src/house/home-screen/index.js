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
                <h1>Home</h1>
                {currentUser && <span className="mt-2"><h2>Welcome {currentUser.username}</h2></span>}
                {currentUser && currentUser["role"] === "agent" && <PostHouse />}
            </div>
            <HouseList />
        </>
    );
};
export default HomeScreen;
