import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HouseItem from "./houseItem";
import {
  findHousesThunk,
  findPublicHousesThunk,
} from "../services/houses-thunks";

const HouseList = () => {
  const { houses, publicHouses, loading, reload } = useSelector(
    (state) => state.houses
  );
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let totalHouses = [...houses, ...publicHouses];
  let savedHouses = [];
  let generalHouses = [];
  if (currentUser && currentUser.saved_houses.length > 0) {
    totalHouses.forEach((house) => {
      if (currentUser.saved_houses.includes(house._id)) {
        savedHouses.push(house);
      } else {
        generalHouses.push(house);
      }
    });
  } else generalHouses = totalHouses;
  useEffect(() => {
    dispatch(findHousesThunk());
    setTimeout(() => dispatch(findPublicHousesThunk()), 500);
  }, [reload]);
  return (
    <>
      {loading && <h3>Loading...</h3>}
      {savedHouses.length > 0 && <h3>Saved Houses:</h3>}
      <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
        {savedHouses.map((house) => (
          <HouseItem house={house} isSaved={true} />
        ))}
      </ul>
      <h3>Available Houses:</h3>
      <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
        {generalHouses.map((house) => (
          // console.log(JSON.stringify(house))
          <HouseItem house={house} />
        ))}
      </ul>
    </>
  );
};

export default HouseList;
