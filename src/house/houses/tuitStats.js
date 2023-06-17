import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRotate,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { updateTuitThunk } from "../services/tuits-thunks";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FiThumbsDown } from "react-icons/fi";

const TuitStats = ({ tuit }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="row mt-3">
        <div className="col-2">
          <label>
            <FontAwesomeIcon icon={faComment} />
            <span> {tuit.replies}</span>
          </label>
        </div>
        <div className="col-2">
          <FontAwesomeIcon icon={faRotate} />
          <span> {tuit.retuits}</span>
        </div>
        <div className="col-2">
          <FaHeart
            className="text-danger"
            onClick={() =>
              dispatch(
                updateTuitThunk({
                  ...tuit,
                  likes: !tuit.likes ? 1 : tuit.likes + 1,
                })
              )
            }
          />
          <span className="ms-2">{!tuit.likes ? 0 : tuit.likes}</span>
        </div>

        <div className="col-2">
          <FiThumbsDown
            className="text-danger"
            onClick={() =>
              dispatch(
                updateTuitThunk({
                  ...tuit,
                  dislikes: !tuit.dislikes ? 1 : tuit.dislikes + 1,
                })
              )
            }
          />
          <span className="ms-2">{!tuit.dislikes ? 0 : tuit.dislikes}</span>
        </div>

        <div className="col-2">
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </div>
      </div>
    </>
  );
};
export default TuitStats;
