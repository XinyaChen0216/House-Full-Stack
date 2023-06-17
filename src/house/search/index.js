import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { searchHouse } from "../reducers/houses-reducer";

const Search = () => {
  let [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchHandler = () => {
    dispatch(searchHouse(search));
  };
  return (
    <div className="row mb-4">
      <div className="col-auto input-group">
        <input
          type="text"
          className="form-control"
          value={search}
          placeholder="Enter an address, neighborhood, city"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            style={{ "borderRadius": 0 }}
            type="button"
            onClick={searchHandler}
          >
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Search;
