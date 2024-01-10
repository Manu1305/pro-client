import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, } from "react-router-dom";
import ScrollToTop from "../Scrolltotop";
import Login from "../Auth/UserLogin/Login";
import Navbar from "./Pages/Navbar/Navbar";
import Header from "./Header/Home/Header";
import Store from "./Pages/Profile/Seller/Store/Store";
import SellerPayment from "./Pages/Navbar/Profile/SellerStoreSetup/SellerPayment/SellerPayment";
import CustomerSup from "./Pages/Profile/Seller/SellerCustomerSupport/Customer";
import BankPayment from "./Pages/Navbar/Profile/SellerStoreSetup/SellerPayment/BankPayment/BankPayment";
import Editprofile from "./Dashboard/Sellersettings/sellerprofilesettings/EditProfile/Editprofile";
import Withdraw from "./Dashboard/Withdraw/Withdraw";
import AboutUs from "./Header/Home/AboutSection/About";
import Wish from "./Pages/WishList/Wish";
import SellerProSettings from "./Dashboard/Sellersettings/sellerprofilesettings/sellerProfile";
import ViewProduct from "./Pages/Shop Section/Product Details/ViewProduct";
import BuyerConfirm from "./Pages/Order Flow/BuyerConfirmation/BuyerConfirm";
import BuyerOrder from "./Pages/Buyer Orders/MyOrder";
import Whydetail from "./Header/Home/WhoSection/Whydetail/Whydetail";
import Whatmakeus from "./Header/Home/WhoSection/Whatmake/What";
import WhoWeAre from "./Header/Home/WhoSection/WhoWeare/WhoWeare";
import DeliveryDash from "./Dashboard/Delivery/Delivery Dashboard/Deliverydash";
import Error404 from "./Error/ErrorPage";
import PaymentSuccess from "./Pages/Order Flow/success/PaymentSuccess";
import BuyerReturn from "./Pages/Buyer Orders/Return Request/BuyerReturn";
import EmailCheck from "../Auth/UserLogin/ForgetPassword/Email Confirmation/Email";
import Changepassword from "../Auth/UserLogin/ForgetPassword/Email Confirmation/CHangepassword";
import Notification from "./Pages/Navbar/Notificatios/Notification";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Fonts/Poppinsfonts/Poppins-Bold.ttf";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import httpService from "./Error Handling/httpService";
import { apiURL } from "../const/config";
import { userCartItem } from "../Redux/cart/cartAction";
import { addProduct } from "../Redux/product/productAction";
import { RetailFranchise } from "./Pages/Navbar/Franchise/RetailFranchise";
import { WholesaleStore } from "./Pages/Navbar/Franchise/WholesaleStore";
import { DeliveryFranchise } from "./Pages/Navbar/Franchise/DeliveryFranchise";
import { ContactUs } from "./Pages/Footer/ContactUs/ContactUs";
import { CareerWithUs } from "./Pages/Footer/CareerWithUs/CareerWithUs";
import { PrivacyPolicy } from "./Pages/Footer/Privacy&Policy/Privacy&Policy";
import { SizeChart } from "./Pages/Footer/Size&Chart/Size&Chart";
import { FaQ } from "./Pages/Footer/FAQ/FaQ";
import { TermsCondition } from "./Pages/Footer/Terms & Condition/Terms & Condition";
import SellerRelatedPro from "./Pages/Shop Section/SellerRelatedProduct/sellerRelatedPro";
import DashHome from "./Dashboard/Home/DashHome";
import { ProductRequest } from "./Dashboard/Product Request/ProductReq";
import { PremiumSellers } from "./Dashboard/User Management/seller/PremiumSeller";
import VendorDashboard from "./Dashboard/Home/VendorDashboard";
import AddProduct from "./Dashboard/AddProduct/AddProduct";
import SingleOrder from "./Dashboard/Order/singleOrderdetail/SingleOrder";
import Thankyou from './../Auth/Buyer&SellerRegister/SellerRegistration/Thankyou';
import Register from './../Auth/Buyer&SellerRegister/Register';
import Plans from './../Auth/Buyer&SellerRegister/SellerRegistration/PlansForm/Plans';
import SellerRegister from './../Auth/Buyer&SellerRegister/SellerRegistration/ProfileForm/SellerRegistration';
import FreeSubscriptionForm from "../Auth/Buyer&SellerRegister/SellerRegistration/PlansForm/FreePlan";
import SubscriptionForm from './../Auth/Buyer&SellerRegister/SellerRegistration/ConfirmationPage/Confirmation';
import { ProductSec } from "./Dashboard/Product/Product";
import AdminWithdrawControl from './Dashboard/Withdraw/Admin/AdminWithdrawControl';
import { AllUsers } from './Dashboard/User Management/AllUsers';
import AllOrders from "./Dashboard/Order/All Order/AllOrders";
import { ReturnReq } from './Dashboard/Return Request/ReturnReq/ReturnReq';
import OrderHistory from './Dashboard/Order/Orderhistory';
import { ReturnDelivery } from './Dashboard/Delivery/Return Delivery/ReturnDelivery';
import Profile from "./Pages/Navbar/Dropdown/ProfileDropdown";
import { StorePage } from './../Auth/Buyer&SellerRegister/SellerRegistration/RegistrationPage';
import { Footer } from './Pages/Footer/Footer';
import Shop from "./Pages/Shop Section/Shop";
import ColorAndSizes from "./Dashboard/AddProduct/ColorAndSizes";
import UploadImages from "./Dashboard/AddProduct/UploadImages";
import ProductDetails from "./Dashboard/AddProduct/ProductDetails";

const LazyCart = React.lazy(() => import("./Pages/Cart/Cart"));
const LazyMainPage = React.lazy(() =>
  import("./Pages/Profile/Seller/StoreSetupMainPage/MainPage"))

const App = () => {

  const [products, setProducts] = useState([]);
  const [ProductLength, setProductLength] = useState();

  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

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
            console.log(res.data)
          } else {
            dispatch(userCartItem(res.data));
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

        const filByStaus = res.data.filter((prd) => prd.status === "Published");
        dispatch(addProduct(filByStaus));
        console.log("All Products", filByStaus);

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
    <ScrollToTop>
      <div className="fontClass">
        <Navbar products={products} />
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route
            path="login"
            element={!user?.name ? <Login /> : <Header products={products} />}
          />
          <Route path="/" element={<Header products={products} />} />


          <Route path="/cart" element={<React.Suspense fallback={<div><ScaleLoader /> </div>}   > {" "}  {user?.name ? <LazyCart /> : <Login />}   </React.Suspense>} />

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
          <Route path="sellerplans" element={<Plans />} />
          <Route path="StorePage" element={<StorePage />} />

          <Route path="store" element={<Store />} />
          <Route path="payment" element={<SellerPayment />} />
          <Route path="customer" element={<CustomerSup />} />
          <Route path="bank" element={<BankPayment />} />
          <Route path="pages" element={<StorePage />} />
          <Route path="sellerregistration" element={<SellerRegister />} />
          <Route path="free" element={<FreeSubscriptionForm />} />
          <Route path="confirmation" element={<SubscriptionForm />} />
          <Route path="buyerOrder" element={<BuyerOrder />} />
          <Route path="/whyus" element={<Whydetail />} />
          <Route path="/whatus" element={<Whatmakeus />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/orderDetails/:orderId" element={<SingleOrder />} />
          <Route path="/payment_succesfull" element={<PaymentSuccess />} />


          <Route
            path="/shop"
            element={<Shop products={products} setProductLength={setProductLength} ProductLength={ProductLength} />}
          />
          <Route
            path="/shop/:cate"
            element={<Shop products={products} setProductLength={setProductLength} ProductLength={ProductLength} />}
          />

          <Route path="About" element={<AboutUs />} />
          <Route
            path="/forgotpassword/:id/:token"
            element={<Changepassword />}
          />

          <Route path="/passwordupdate" element={<EmailCheck />} />
          <Route path="Wish" element={<Wish />} />


          <Route path="/profile/:id " element={<Profile />} />
          <Route path="/Profilepage/:id" element={<SellerProSettings />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/returnPro/:id" element={<BuyerReturn />} />

          {/* franchies */}
          <Route path="/wholesale-store" element={<WholesaleStore />} />
          <Route path="/delivery-frenchies" element={<DeliveryFranchise />} />
          <Route path="/retail-franchise" element={<RetailFranchise />} />
          <Route path="/ViewDetails/:id" element={<SellerRelatedPro productItems={products} />} />


          {/* footer data */}
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/career" element={<CareerWithUs />} />
          <Route path="/privacyPol" element={<PrivacyPolicy />} />
          <Route path="/sizeChart" element={<SizeChart />} />
          <Route path="/faq" element={<FaQ />} />
          <Route path="/termsCond" element={<TermsCondition />} />


          {/* Dashboard Components */}
          <Route path="/dashboard" element={<DashHome products={ProductLength} />}    >


            {/*  Admin Seller Dashboard*/}
            <Route path="chart-deatils" element={<VendorDashboard />} />
            <Route path="product-requsets" element={<ProductRequest />} />

            {/* AddProduct Routes */}
            <Route path="add-products" element={<AddProduct />} >
              <Route path="product-details" element={<ProductDetails />} />
              <Route path="color-and-sizes" element={<ColorAndSizes />} />
              <Route path="upload-product-images" element={<UploadImages />} />
              <Route index element={<Navigate to="product-details" replace />} />
            </Route>


            <Route path="all-orders" element={<OrderHistory />} />
            <Route path="premium-sellers" element={<PremiumSellers />} />
            <Route path="user-management" element={<AllUsers />} />
            <Route path="admin-withdraw-details" element={<AdminWithdrawControl />} />
            <Route path="return-order-requests" element={<ReturnReq />} />


            {/* Seller Dashboard */}
            <Route path="all-products" element={<ProductSec />} />
            <Route path="my-orders" element={<AllOrders />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="withdraw-details" element={<Withdraw />} />

            {/* delivery Dashboard */}
            <Route path="assign-delivery" element={<DeliveryDash />} />
            <Route path="assign-return-delivery" element={<ReturnDelivery />} />


            <Route
              index
              element={<Navigate to="chart-deatils" replace />}
            />
          </Route>


          {/* Edit Product */}
          <Route path="/edit-product/:productId" element={<AddProduct />} >
            <Route path="product-details" element={<ProductDetails />} />
            <Route path="color-and-sizes" element={<ColorAndSizes />} />
            <Route path="upload-product-images" element={<UploadImages />} />
            <Route index element={<Navigate to="product-details" replace />} />
          </Route>
        </Routes>
        <Footer />

      </div>

    </ScrollToTop>
  );
};

export default App;
