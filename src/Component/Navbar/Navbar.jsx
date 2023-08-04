import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import  Profile  from "./Dropdown/ProfileDropdown";
import { addUser } from "../../Redux/user/userAction";
import axios from "axios";
import SearchBar from "./Search/Search";
import { useNavigate } from "react-router";
import { MdMarkEmailRead, MdOutlineNotificationsNone } from "react-icons/md";
import { apiURL } from "../../const/config";

 const Navbar = ({ wishlist, cartItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useNavigate();
  let user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user?.email);

  const getCartCarts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {})
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("API Error", error);
    }
  };
  useEffect(() => {
    getCartCarts();
  }, []);

  useEffect(() => {
    if (user && !user.name) {
      try {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        dispatch(addUser(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: scrollPosition > 0 ? "white" : "white",
      }}
    >
      <li>
        <Link to="/" onClick={closeMenu} className={styles.heading}>
          {/* HITEC MART */}
          <img
                src="../Image/loho.jpeg"
                alt=""
                style={{ width: "140px", height: "50px" }}
                className={`rounded-circle ${styles.imgcircle}`}
              />
        </Link>
      </li>
      <SearchBar />
      <div className={styles["navbar-toggle"]} onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <ul className={`${styles["navbar-menu"]} ${showMenu ? styles.show : ""}`}>
        {user?.urType === "buyer" && (
          <li>
            <Link to="/" onClick={closeMenu}>
              HOME
            </Link>
          </li>
        )}

        {user?.urType !== "admin" &&
          user?.urType !== "seller" &&
          user?.urType !== "delivery" && (
            <li>
              <Link to="shoppingPage" onClick={closeMenu}>
                SHOP
              </Link>
            </li>
          )}
        {user?.urType === "buyer" && (
          <li>
            <Link to="bloghome" onClick={closeMenu}>
              Blog
            </Link>
          </li>
        )}
        {(user?.urType === "buyer" || user?.urType === "seller") && (
          <li>
            <Link to="About" onClick={closeMenu}>
              ABOUT
            </Link>
          </li>
        )}

        {user?.urType === "buyer" && (
          <li>
            {user && user.email ? (
              <Link to="Wish" onClick={closeMenu}>
                <AiOutlineHeart />
                {wishlist.length === 0 ? "" : wishlist.length}
              </Link>
            ) : (
              <Link to="login" onClick={closeMenu}>
                <AiOutlineHeart />
                {wishlist.length === 0 ? "" : wishlist.length}
              </Link>
            )}
          </li>
        )}

        {user?.urType === "buyer" && (
          <li>
            {user && user.email ? (
              <Link to="cart" onClick={closeMenu}>
                <CgShoppingCart />
                {cartItems != 0 ? (
                  <span className={styles.length1}>
                    {cartItems === 0 ? "" : cartItems}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            ) : (
              <Link to="login" onClick={closeMenu}>
                <CgShoppingCart />
                <span>{cartItems === 0 ? "" : cartItems}</span>
              </Link>
            )}
          </li>
        )}

        <li style={{ height: "20px" }}>
          {user && user.email ? (
            <Profile />
          ) : (
            <Link to="login">
              <FiUser />
            </Link>
          )}
        </li>

        <MdOutlineNotificationsNone className='fa-lg' onClick={() => navigation('/notifications')} />
      </ul>
    </nav>
  );
};

export default Navbar
