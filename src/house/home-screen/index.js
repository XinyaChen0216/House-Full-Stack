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
                {currentUser && <h4>Welcome {currentUser.username}</h4>}
                {currentUser && currentUser["role"] === "agent" && <PostHouse />}
            </div>
            <HouseList />
        </>
    );
};
export default HomeScreen;
