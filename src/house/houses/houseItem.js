import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { deleteHouse } from "../reducers/houses-reducer";
import { useSelector } from "react-redux";
import { updateUserThunk } from "../services/auth-thunks";

const HouseItem = ({ house, isSaved = false }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const deletePostHandler = (event, id) => {
    event.stopPropagation();
    dispatch(deleteHouse(id));
  };
  const { currentUser } = useSelector((state) => state.user);
  const savePostHandler = async (event) => {
    event.stopPropagation();
    if (currentUser) {
      let currSavedHouses = [...currentUser.savedHouses];
      const idx = currSavedHouses.findIndex((curr) => curr === house._id);
      if (idx >= 0) {
        currSavedHouses.splice(idx, 1);
      } else {
        currSavedHouses.push(house._id);
      }
      let newProfile = {
        ...currentUser,
        savedHouses: [...currSavedHouses]
      }
      await dispatch(updateUserThunk(newProfile));
    }
  };
  return (
    <>
      <li
        className="list-group-item border border-0 p-0 pb-1 pe-1"
        style={{ width: "19rem" }}
      >
        <div className="card" onClick={() => setModalShow(true)}>
          <div className="">
            <img
              src={`/images/${house.images[0]}`}
              className="card-img-top position-relative"
              alt="..."
            />
            <span
              className="float-end position-absolute top-0 end-0 pe-2 pt-2"
              onClick={(event) => deletePostHandler(event, house._id)}
            >
              <RxCross1 />
            </span>
            <span
              className="float-end position-absolute top-0 start-0 ps-2 pt-2"
              onClick={(event) => savePostHandler(event)}
            >
              {isSaved && <FaHeart className="text-danger" /> || <FaRegHeart />}
            </span>
          </div>
          <div className="card-body pb-1">
            <h5 className="card-title">Price: ${house.price}</h5>
            <div className="card-text">
              <p className="mb-0">
                {house.address}, {house.city}, {house.state} {house.zip}
              </p>
              <p>{house.overview}</p>
            </div>
          </div>
        </div>
      </li>
      <Modal
        size="lg"
        scrollable="true"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-between w-100">
            <span>
              {house.address}, {house.city}, {house.state} {house.zip}
            </span>
            <span className="me-3" onClick={(event) => savePostHandler(event)}>
              <FaRegHeart className="" />
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel data-bs-theme="dark">
            {house.images.map((image) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`/images/${image}`}
                  alt=""
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h3>Overview</h3>
          <span>{house.overview}</span>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HouseItem;
