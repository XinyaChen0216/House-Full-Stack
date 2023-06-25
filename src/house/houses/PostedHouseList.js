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
  if (currentUser) {
    houses.forEach(house => {
      if (house.agent.includes(currentUser._id)) {
        postedHouses.push(house);
      } 
    });
  } 

  
  // console.log(houses)
  // console.log(savedHouses)
  // console.log(generalHouses)
  useEffect(() => {
    dispatch(findHousesThunk())
  }, [])
  if(postedHouses.length === 0){
    return <h3>No Posted Houses Yet</h3>
  } else{
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
  );}
};

export default PostedHouseList;
