import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";
import React from "react";
import { deleteAdThunk } from "../services/ad-thunks";
import { viewProfileByIdThunk } from "../services/auth-thunks";

const AdItem = ({ ad }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deletePostHandler = (event, id) => {
        event.stopPropagation();
        dispatch(deleteAdThunk(id));
    };

    return (
        <>
            <li
                className="list-group-item border border-0 p-0 pb-1 pe-1"
                style={{ width: "19rem", height: "305px" }}
            >
                <div
                    className="card"
                    onClick={async () => {
                        await dispatch(viewProfileByIdThunk(ad.agent));
                        let url = "/house/profile/" + ad.agent;
                        navigate(url);
                    }}
                >
                    {/* {currentUser && currentUser.role === "admin" && ( */}
                    <div className="">
                        <img
                            src={`data:image/png;base64,${ad.imageString}`}
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
                        <h5 className="card-title">{ad.username}</h5>
                        <div className="card-text">
                            <p className="mb-0">{ad.overview}</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default AdItem;
