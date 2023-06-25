import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HouseItem from "./houseItem";
import { findHousesThunk } from "../services/houses-thunks";

const SavedHouseList = () => {
  const { houses, loading } = useSelector((state) => state.houses);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(JSON.stringify(houses))
  const dispatch = useDispatch();
  let savedHouses = [];
  let generalHouses = [];
  if (currentUser && currentUser.saved_houses.length > 0) {
    houses.forEach(house => {
      if (currentUser.saved_houses.includes(house._id)) {
        savedHouses.push(house);
      } else {
        generalHouses.push(house)
      }
    });
  } else generalHouses = houses;
  
  useEffect(() => {
    dispatch(findHousesThunk())
  }, [])
  return (
    <>
      {loading && <h3>Loading...</h3>}
      {savedHouses.length > 0 && <h3>Saved Houses:</h3>}
      <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
        {savedHouses.map((house) => (
          <HouseItem house={house} isSaved={true} />
        ))}
      </ul>
      
    </>
  );
};

export default SavedHouseList;
