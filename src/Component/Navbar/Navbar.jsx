import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { CgShoppingCart } from "react-icons/cg";
import  Profile  from "./Dropdown/ProfileDropdown";
import SearchBar from "./Search/Search";
import { useNavigate } from "react-router";
import {  MdOutlineNotificationsNone } from "react-icons/md";


 const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useNavigate();
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.user);

  // const userCart = cart.filter((ele) => ele.userEmail === user.email)

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
      className={`shadow-xl ${styles.navbar}`}
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
        {(user?.urType !== "admin"|| user?.urType !== "seller") && (
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
        {(user?.urType !== "admin"|| user?.urType !== "seller") && (
          <li>
            <Link to="bloghome" onClick={closeMenu}>
              BLOG
            </Link>
          </li>
        )}
        {(user?.urType !== "admin"|| user?.urType !== "seller") && (
          <li>
            <Link to="About" onClick={closeMenu}>
              ABOUT
            </Link>
          </li>
        )}

        {user?.urType === "buyer" && (
          <li >
            {user && user.email ? (
              <Link to="Wish" onClick={closeMenu}>
                <AiOutlineHeart style={{height:"20px",width:'20px'}} />
              </Link>
            ) : (
              <Link to="login" onClick={closeMenu}  >
                <AiOutlineHeart style={{height:"20px",width:'20px'}} />
              </Link>
            )}
          </li>
        )}

        {user?.urType === "buyer" && (
          <li>
            {user && user.email ? (
              <Link to="cart" onClick={closeMenu}>
                <CgShoppingCart style={{height:"20px",width:'20px'}} />
                {/* {userCart != 0 ? (
                  <span className={styles.length1}>
                    {userCart === 0 ? "" : userCart}
                  </span>
                ) : (
                  ""
                )} */}
              </Link>
            ) : (
              <Link to="login" onClick={closeMenu}>
                <CgShoppingCart style={{height:"20px",width:'20px'}} />
                {/* <span>{userCart === 0 ? "" : userCart}</span> */}
              </Link>
            )}
          </li>
        )}

        <li style={{ height: "20px" }} >
          {user && user.email ? (
            <Profile closemenu={closeMenu} />
          ) : (
            <Link to="login"  onClick={closeMenu} style={{marginTop:'5px'}}  >
              <FiUser style={{height:"20px",width:'20px'}} />
            </Link>
          )}
        </li>
     {
(user?.urType === "seller" || user?.urType === "admin") && <li style={{ height: "20px" }}>
<MdOutlineNotificationsNone className='fa-lg' onClick={() => navigation('/notifications')} />

   </li>

}   
</ul>
     
    </nav>
  );
};

export default Navbar
