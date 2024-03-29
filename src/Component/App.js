import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../Scrolltotop";
import Login from "./Navbar/Login/UserLogin/Login";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Home/Header";
import BlogHome from "./Pages/BlogHome/BlogHome";
import DetailsPages from "./Pages/Details/DetailsPages";
import SellerDashboard from "./Navbar/Profile/SellerDashboard/SellerDash";
import Register from "./Navbar/Login/Buyer&SellerRegister/Register";
import Plans from "./Navbar/Login/Buyer&SellerRegister/SellerRegistration/PlansForm/Plans";
import MainPage from "./Navbar/Profile/SellerStoreSetup/StoreSetupMainPage/MainPage";
import Store from "./Navbar/Profile/SellerStoreSetup/Store/Store";
import SellerPayment from "./Navbar/Profile/SellerStoreSetup/SellerPayment/SellerPayment";
import CustomerSup from "./Navbar/Profile/SellerStoreSetup/SellerCustomerSupport/Customer";
import BankPayment from "./Navbar/Profile/SellerStoreSetup/SellerPayment/BankPayment/BankPayment";
import StorePage from "./Navbar/Profile/SellerStoreSetup/Pages";
import Profile from "./Navbar/Dropdown/ProfileDropdown";
import Editprofile from "./Dashboard/Sellersettings/sellerprofilesettings/EditProfile/Editprofile";
import AddProduct from "./Navbar/Profile/SellerDashboard/ProductSec/Addproduct";
import Withdraw from "./Dashboard/Withdraw/Withdraw";
import SellerSettingsPage from "./Dashboard/Sellersettings/SellerSettings";
import Thankyou from "./Navbar/Login/Buyer&SellerRegister/SellerRegistration/Thankyou";
import AboutUs from "./Header/Home/AboutSection/About";
import SubscriptionForm from "./Navbar/Login/Buyer&SellerRegister/SellerRegistration/ConfirmationPage/Confirmation";
import Wish from "./Header/WishList/Wish";
import SellerProSettings from "./Dashboard/Sellersettings/sellerprofilesettings/sellerProfile";
import ViewProduct from "./Shopingsection/Productdetails/ViewProduct";
import BuyerConfirm from "./Header/BuyerConfirmation/BuyerConfirm";
import FreeSubscriptionForm from "./Navbar/Login/Buyer&SellerRegister/SellerRegistration/PlansForm/FreePlan";
import BuyerOrder from "./Navbar/Profile/BuyerDashboard.js/MyOrder";
import SellerRegister from "./Navbar/Login/Buyer&SellerRegister/SellerRegistration/ProfileForm/SellerRegistration";
import Whydetail from "./Header/Home/WhoSection/Whydetail/Whydetail";
import Whatmakeus from "./Header/Home/WhoSection/Whatmake/What";
import WhoWeAre from "./Header/Home/WhoSection/WhoWeare/WhoWeare";
import ProductVerification from "./Navbar/Profile/AdminDashboard/ProductDetails.jsx/ProductVerification";
import DeliveryDash from "./Navbar/Profile/DeliveryDashBoard/Deliverydash";
import AssignDekivery from "./Navbar/Profile/AdminDashboard/AssignDelivery/AssignDeliver";
import Error404 from "./Error/ErrorPage";
import PaymentSuccess from "./success/PaymentSuccess";
import BuyerReturn from "./Navbar/Profile/BuyerDashboard.js/ReturnForm/BuyerReturn";
import EmailCheck from "./Navbar/Login/UserLogin/ForgetPassword/Emailconfirmation.jsx/Email";
import Changepassword from "./Navbar/Login/UserLogin/ForgetPassword/Emailconfirmation.jsx/CHangepassword";
import Notification from "./Navbar/Notificatios/Notification";
import ShoppingPage from "./Shopingsection/Shopping";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Fonts/Poppinsfonts/Poppins-Bold.ttf";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import httpService from "./Error Handling/httpService";
import { apiURL } from "../const/config";
import { userCartItem } from "../Redux/cart/cartAction";
import { addProduct } from "../Redux/product/productAction";
import { RetailFranchise } from "./Navbar/Franchise/RetailFranchise";
import { WholesaleStore } from "./Navbar/Franchise/WholesaleStore";
import { DeliveryFranchise } from "./Navbar/Franchise/DeliveryFranchise";
import { ContactUs } from "./Footer/ContactUs/ContactUs";
import { CareerWithUs } from "./Footer/CareerWithUs/CareerWithUs";
import { PrivacyPolicy } from "./Footer/Privacy&Policy/Privacy&Policy";
import { SizeChart } from "./Footer/Size&Chart/Size&Chart";
import { FaQ } from "./Footer/FAQ/FaQ";
import { TermsCondition } from "./Footer/Terms & Condition/Terms & Condition";
import SellerRelatedPro from "./Shopingsection/SellerRelatedProduct/sellerRelatedPro";
import SingleOrder from "./singleOrderdetail/SingleOrder";
import { Publish } from "@mui/icons-material";
import DashHome from "./Dashboard/DashHome";
import { ProductRequest } from "./Navbar/Profile/AdminDashboard/ProductReq";
import Product from "./Navbar/Profile/SellerDashboard/Vendor/VendorComponent/Products/Products";
import { WithdrawSec } from "./Navbar/Profile/SellerDashboard/WithdrawSec/WithdrawSec";
import { PremiumSellers } from "./Navbar/Profile/SellerDashboard/PremiumSellers/PremiumSeller";
import Dash from "./Dashboard/Dash";
const LazyCart = React.lazy(() => import("./Header/Cart/Cart"));
const LazySellerDashboard = React.lazy(() =>
  import("./Navbar/Profile/SellerDashboard/SellerDash")
);


const LazyMainPage = React.lazy(() =>
  import("./Navbar/Profile/SellerStoreSetup/StoreSetupMainPage/MainPage")
);



const App = () => {

  const [produts, setProducts] = useState([]);
  const [ProductLength, setProductLength] = useState();

  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  // Cart

  const getCarts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      return await httpService
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {
          if (res.data.Message === "Your cart is empty...!") {
            // setCartItem([]);
          } else {
            console.log("UserCARt", res);
            dispatch(userCartItem(res.data));
            // setCartItem(res.data);
          }
        })
        .catch((err) => console.log(err.config.message));
    } catch (error) {
      console.log("API Error", error);
    }
  };
  // all products
  const getAllProducts = async () => {
    await httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        console.log("All Products", res.data);

        const filByStaus = res.data.filter((prd) => prd.status === "Published");
        dispatch(addProduct(filByStaus));
        setProducts(filByStaus);
        setProductLength(filByStaus.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getCarts();
    getAllProducts();
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <div className="fontClass">
          <Navbar products={produts} />
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route
              path="login"
              element={!user?.name ? <Login /> : <Header />}
            />
            <Route path="/" element={<Header products={produts} />} />
            <Route path="/dashboard" element={<DashHome products={ProductLength} />}    >
              {/* HERRE */}
              
              <Route path="dashboard" element={<Dash />} />
              <Route path="product-requests" element={<ProductRequest />} />
              <Route path="add-products" element={<AddProduct />} />
              <Route path="products" element={<Product />} />
              <Route path="withdraw-details" element={<WithdrawSec />} />
              <Route path="premium-sellers" element={<PremiumSellers />} />
            </Route>


            <Route
              path="/cart"
              element={
                <React.Suspense
                  fallback={
                    <div>
                      <ScaleLoader />
                    </div>
                  }
                >
                  {" "}
                  {user?.name ? <LazyCart /> : <Login />}
                </React.Suspense>
              }
            />























            <Route
              path="storeset"
              element={
                <React.Suspense fallback={<div>Loading... </div>}>

                  <LazyMainPage />
                </React.Suspense>
              }
            />
            <Route path="/ViewDetails/:productId" element={<ViewProduct getAllProducts={getAllProducts} />} />

            <Route path="confirm/:totalPrice" element={<BuyerConfirm />} />
            <Route path="thankyou" element={<Thankyou />} />

            <Route path="register" element={<Register />} />
            <Route path="bloghome" element={<BlogHome />} />
            <Route path="/details/:id" element={<DetailsPages />} />
            <Route path="sellerplans" element={<Plans />} />
            <Route path="StorePage" element={<StorePage />} />
            {/* <Route path="/dashboard/Addproduct/:productId" element={<AddProduct />} /> */}
            <Route path="storeset" element={<MainPage />} />
            <Route path="store" element={<Store />} />
            <Route path="payment" element={<SellerPayment />} />
            <Route path="customer" element={<CustomerSup />} />
            <Route path="bank" element={<BankPayment />} />
            <Route path="pages" element={<StorePage />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="sellersettings" element={<SellerSettingsPage />} />
            <Route path="sellerregistration" element={<SellerRegister />} />
            <Route path="free" element={<FreeSubscriptionForm />} />
            <Route path="confirmation" element={<SubscriptionForm />} />
            <Route path="buyerOrder" element={<BuyerOrder />} />
            <Route path="/whyus" element={<Whydetail />} />
            <Route path="/whatus" element={<Whatmakeus />} />
            <Route path="/whoweare" element={<WhoWeAre />} />
            <Route path="/orderDetails/:orderId" element={<SingleOrder />} />
            <Route
              path="/productVerification/:id"
              element={<ProductVerification />}
            />
            <Route path="/deliverydash" element={<DeliveryDash />} />
            <Route path="/deliveryGuys" element={<AssignDekivery />} />
            <Route path="/payment_succesfull" element={<PaymentSuccess />} />
            <Route
              path="/shoppingPage"
              element={<ShoppingPage products={produts} />}
            />
            <Route
              path="/shoppingPage/:category"
              element={<ShoppingPage products={produts} />}
            />

            <Route
              path="/shoppingPages/:category/:collections"
              element={<ShoppingPage products={produts} />}
            />
            <Route path="About" element={<AboutUs />} />
            <Route
              path="/forgotpassword/:id/:token"
              element={<Changepassword />}
            />

            <Route path="/passwordupdate" element={<EmailCheck />} />
            <Route path="Wish" element={<Wish />} />
            <Route path="notifications" element={<Notification />} />

            <Route path="/profile/:id " element={<Profile />} />
            <Route path="/Profilepage/:id" element={<SellerProSettings />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/returnPro/:id" element={<BuyerReturn />} />

            {/* franchies */}
            <Route path="/wholesale-store" element={<WholesaleStore />} />
            <Route path="/delivery-frenchies" element={<DeliveryFranchise />} />
            <Route path="/retail-franchise" element={<RetailFranchise />} />
            <Route path="/ViewDetails/:id" element={<SellerRelatedPro productItems={produts} />} />


            {/* footer data */}
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/career" element={<CareerWithUs />} />
            <Route path="/privacyPol" element={<PrivacyPolicy />} />
            <Route path="/sizeChart" element={<SizeChart />} />
            <Route path="/faq" element={<FaQ />} />
            <Route path="/termsCond" element={<TermsCondition />} />

          </Routes>
        </div>


      </ScrollToTop>
    </Router>
  );
};

export default App;
