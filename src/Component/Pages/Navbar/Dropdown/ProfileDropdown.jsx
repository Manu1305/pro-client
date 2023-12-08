import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RiUserSmileFill } from "react-icons/ri";
import { MdMarkEmailRead } from "react-icons/md";
import { FaFirstOrder } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import styless from "./profileDrop.module.css";
import { currentUserData } from "./../../../../Redux/user/userAction";

const Profile = ({ closemenu }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch(currentUserData({}));
    navigation("/login");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="white"
        id="dropdown-basic"
        className={styless.prof}
      >
        <img
          className={styless.des}
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link
          to="/Profilepage/:id"
          onClick={closemenu}
          className="bg-white text-black"
        >
          <Dropdown.Item href="#/action-1" className="bg-white text-black">
            <RiUserSmileFill /> {user.name}
          </Dropdown.Item>{" "}
        </Link>
        <Dropdown.Item href="#/action-2" className="bg-white text-black">
          <MdMarkEmailRead onClick={closemenu} /> {user.email}
        </Dropdown.Item>

        {(user?.urType === "seller" ||
          user?.urType === "admin" ||
          user?.urType === "delivery") && (
          <Link to="/dashboard" className="bg-white text-black">
            <Dropdown.Item
              href="#/action-3"
              className="bg-white text-black"
              onClick={closemenu}
            >
              Dashboard
            </Dropdown.Item>
          </Link>
        )}

        {user?.urType === "buyer" && (
          <Link to="/buyerOrder" className="bg-white text-black">
            <Dropdown.Item href="#/action-3" className="bg-white text-black">
              <FaFirstOrder />
              My Orders
            </Dropdown.Item>
          </Link>
        )}
        <Link to="/editprofile" className="bg-white text-black">
          <Dropdown.Item href="/editprofile" className="bg-white text-black">
            <GrUpdate onClick={closemenu} /> Update Profile
          </Dropdown.Item>
        </Link>

        <Link to="/Login" className="bg-white text-black">
          <Dropdown.Item href="#/action-3" className="bg-white text-black">
            <button onClick={logout}>
              <CiLogout /> Logout
            </button>
          </Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Profile;
