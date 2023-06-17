import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findTuitsThunk } from "../services/tuits-thunks";
import HouseItem from "./houseItem";

const HouseList = () => {
  const { houses, loading } = useSelector((state) => state.houses);
  const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(findTuitsThunk())
  // }, [])
  return (
    <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
      {loading && <li className="list-group-item">Loading...</li>}
      {houses.map((house) => (
        <HouseItem house={house} />
      ))}
    </ul>
  );
};

export default HouseList;
