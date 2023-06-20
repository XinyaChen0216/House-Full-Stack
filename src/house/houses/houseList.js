import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findTuitsThunk } from "../services/tuits-thunks";
import HouseItem from "./houseItem";

const HouseList = () => {
  const { houses, loading } = useSelector((state) => state.houses);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(JSON.stringify(houses))
  const dispatch = useDispatch();
  let savedHouses = [];
  let generalHouses = [];
  if (currentUser && currentUser.savedHouses.length > 0) {
    houses.forEach(house => {
      if (currentUser.savedHouses.includes(house._id)) {
        savedHouses.push(house);
      } else {
        generalHouses.push(house)
      }
    });
  } else generalHouses = houses;
  // useEffect(() => {
  //     dispatch(findTuitsThunk())
  // }, [])
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
          <HouseItem house={house} />
        ))}
      </ul>
    </>
  );
};

export default HouseList;
