import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { deleteHouse } from "../reducers/houses-reducer";
import { useSelector } from "react-redux";
import { updateUserThunk, viewProfileByIdThunk } from "../services/auth-thunks";
import { useNavigate } from "react-router";
import { BsFillHouseHeartFill, BsFillCalendarWeekFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";

const HouseItem = ({ house, isSaved = false }) => {
  const [modalShow, setModalShow] = useState(false);
  const [anonymousUserModalShow, setAnonymousUserModalShow] = useState(false);
  const [agentModalShow, setAgentModalShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletePostHandler = (event, id) => {
    event.stopPropagation();
    dispatch(deleteHouse(id));
  };
  const { currentUser } = useSelector((state) => state.user);
  const savePostHandler = async (event) => {
    event.stopPropagation();
    if (currentUser.role === 'buyer' || currentUser.role === 'seller') {
      let currSavedHouses = [...currentUser.saved_houses];

      const idx = currSavedHouses.findIndex((curr) => curr === house._id);
      if (idx >= 0) {
        currSavedHouses.splice(idx, 1);
      } else {
        currSavedHouses.push(house._id);
      }
      let newProfile = {
        ...currentUser,
        saved_houses: [...currSavedHouses],
      };
      await dispatch(updateUserThunk(newProfile));
    } else if (currentUser.role === 'agent') {
      setAgentModalShow(true);
    } else {
      setAnonymousUserModalShow(true);
    }
  };
  return (
    <>
      <li
        className="list-group-item border border-0 p-0 pb-1 pe-1"
        style={{ width: "19rem", height: "305px" }}
      >
        <div className="card" onClick={() => setModalShow(true)}>
          <div className="">
            {(!house.isPublic && (
              <img
                src={`data:image/png;base64,${house.imageStrings[0]}`}
                className="card-img-top position-relative"
                alt="..."
                style={{ width: "100%", height: "200px" }}
              />
            )) || (
                <img
                  src={`${house.images[0]}`}
                  className="card-img-top position-relative"
                  alt="..."
                  style={{ width: "100%", height: "200px" }}
                />
              )}
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
              {(isSaved && <FaHeart className="text-danger" />) || (
                <FaRegHeart />
              )}
            </span>
          </div>
          <div className="card-body pb-1">
            <h5 className="card-title">Price: ${house.price}</h5>
            <div className="card-text">
              <p className="mb-0">
                {house.address}, {house.city}, {house.state} {house.zipcode}
              </p>
              {/* <p>{house.overview}</p> */}
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
              {house.address}, {house.city}, {house.state} {house.zipcode}
            </span>
            <span
              className="me-3"
              onClick={(event) => {
                savePostHandler(event);
                setModalShow(false);
              }}
            >
              {(isSaved && <FaHeart className="text-danger" />) || (
                <FaRegHeart />
              )}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel data-bs-theme="dark">
            <iframe
              src={`https://maps.google.com/maps?q=${house.latitude},${house.longitude}&hl=es;&output=embed`}
              height="500px"
              width="100%"
              title={house._id}
            />
            {(!house.isPublic &&
              house.imageStrings.map((imageString) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`data:image/png;base64,${imageString}`}
                    alt=""
                    style={{ width: "100%", height: "500px" }}
                  />
                </Carousel.Item>
              ))) ||
              house.images.map((image) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt=""
                    style={{ width: "100%", height: "500px" }}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
          <h3>
            <div className="mb-1">
              <b>
                <span className="fs-1">${house.price}</span>
              </b>{" "}
              <span className="ms-4">
                <b>{house.bedrooms}</b> bd | <b>{house.bathrooms}</b> ba |{" "}
                <b>{house.size}</b> sqft{" "}
              </span>
            </div>
            <div className="fs-4 mb-3">
              {house.address}, {house.city}, {house.state} {house.zipcode}
            </div>
            <div className="mb-2">
              
              <button type="button" class="btn btn-primary" onClick={async () => {

                        await dispatch(viewProfileByIdThunk(house.agent));
                        let url = '/house/profile/' + house.agent;
                        navigate(url);
                    }}>
                Contact Agent
              </button>
            </div>
            <div className="mb-2">
              {house.status === "active" && (
                <RxDotFilled style={{ color: "red" }} />
              )}
              {house.status === "pending" && (
                <RxDotFilled style={{ color: "orange" }} />
              )}
              {house.status === "sold" && (
                <RxDotFilled style={{ color: "grey" }} />
              )}
              {house.status}
            </div>
            <h4> Overview </h4>
            <div>
              <BsFillHouseHeartFill /> {house.type}
            </div>
            <div>
              <BsFillCalendarWeekFill /> built in {house.year}
            </div>
            <div>
              <GrView />
              <span> {house.overview} </span>
            </div>
          </h3>
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        // scrollable="false"
        show={anonymousUserModalShow}
        onHide={() => setAnonymousUserModalShow(false)}
      >
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Attention</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Must login to save houses!</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="list-group ">
                {
                  <Link
                    className="list-group-item mb-2 btn btn-primary rounded-pill float-end"
                    to="/house/login"
                  >
                    {" "}
                    Login{" "}
                  </Link>
                }
                {
                  <Link
                    className="list-group-item btn btn-primary rounded-pill float-end"
                    to="/house/register"
                  >
                    Register
                  </Link>
                }
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </Modal>

      <Modal
        size="sm"
        // scrollable="false"
        show={agentModalShow}
        onHide={() => setAgentModalShow(false)}
      >
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Attention</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Agent cannot save houses!</p>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      </Modal>

    </>
  );
};

export default HouseItem;
