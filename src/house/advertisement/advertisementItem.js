import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { deleteAd } from "../reducers/ad-reducer";
import { useSelector } from "react-redux";
import { updateUserThunk } from "../services/auth-thunks";

import { BsFillHouseHeartFill, BsFillCalendarWeekFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdItem = ({ ad }) => {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();
    const deletePostHandler = (event, id) => {
        event.stopPropagation();
        dispatch(deleteAd(id));
    };

    return (
        <li
            className="list-group-item border border-0 p-0 pb-1 pe-1"
            style={{ width: "19rem", height: "305px" }}
        >
            <div className="card" onClick={() => setModalShow(true)}>
                <div className="">

                    <img
                        src={`data:image/png;base64,${ad.image}`}
                        className="card-img-top position-relative"
                        alt="..."
                        style={{ width: "100%", height: "200px" }}
                    />

                    <span
                        className="float-end position-absolute top-0 end-0 pe-2 pt-2"
                        onClick={(event) => deletePostHandler(event, ad._id)}
                    >
                        <RxCross1 />
                    </span>

                </div>
                <div className="card-body pb-1">
                    <h5 className="card-title">{ad.first_name} {ad.last_name}</h5>
                    <div className="card-text">
                        <p className="mb-0">
                            {ad.phone}
                            <br />
                            {ad.email}
                        </p>
                        {/* <p>{house.overview}</p> */}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default AdItem;
