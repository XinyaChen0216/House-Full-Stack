// import TuitsStats from "./tuitStats"
import { useDispatch } from "react-redux";
// import { deleteTuit } from "../reducers/tuits-reducer";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { RxCross1 } from "react-icons/rx";
import { BsPatchCheckFill } from "react-icons/bs";
import React from "react";

const HouseItem = ({ house }) => {
  const dispatch = useDispatch();
  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="card col-6">
          <img src={`/images/${house.images[0]}`} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Price: ${house.price}</h5>
            <div className="card-text">
              <p className="mb-0">{house.address}, {house.city}, {house.state}</p>
              <p>{house.overview}</p>
            </div>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HouseItem;

// {/* <div className="col-2">
//                     <img width={70} className="float-end rounded-3" src={`/images/${tuit.image}`} />
//                 </div> */}
//                 {/* <div className="col-10">
//                     <span className="float-end" onClick={() => deleteTuitHandler(tuit._id)}> <RxCross1 /></span>
//                     <div>
//                         <b>{tuit.userName}</b>
//                         <span className="ms-2 me-2" ><BsPatchCheckFill color="blue" /></span>
//                         <span className="me-2">{tuit.handle} </span>
//                         {tuit.time}
//                     </div>
//                     {/* <div className="fw-bolder">{tuit.topic}</div> */}
//                     <div>{tuit.tuit}</div>
//                     {/* <TuitsStats tuit={tuit} /> */}
//                 </div> */}
