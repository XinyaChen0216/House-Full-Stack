import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HouseItem from "./houseItem";
import { findHousesThunk } from "../services/houses-thunks";

const PostedHouseList = () => {
  const { houses, loading } = useSelector((state) => state.houses);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(JSON.stringify(houses))
  const dispatch = useDispatch();
  let postedHouses = [];
  let savedHouses = [];
  let generalHouses = [];
  if (currentUser && currentUser.posted_houses.length > 0) {
    houses.forEach(house => {
      if (currentUser.posted_houses.includes(house._id)) {
        postedHouses.push(house);
      } else {
        generalHouses.push(house)
      }
    });
  } else generalHouses = houses;
  // console.log(houses)
  // console.log(savedHouses)
  // console.log(generalHouses)
  useEffect(() => {
    dispatch(findHousesThunk())
  }, [])
  return (
    <>
      {loading && <h3>Loading...</h3>}
      {postedHouses.length > 0 && <h3>Posted Houses:</h3>}
      <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
        {postedHouses.map((house) => (
          <HouseItem house={house}/>
        ))}
      </ul>
      
    </>
  );
};

export default PostedHouseList;
