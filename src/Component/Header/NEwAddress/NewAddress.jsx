
// import React, { useState } from "react";
// import styles from './NewAddress.module.css';
// import Swal from "sweetalert2";
// import { apiURL } from "../../../const/config";
// import httpService from "../../Error Handling/httpService";


// function NewAddress({getSavedAddress}) {

// const [address, setAddress] = useState({
//     pincode: "",
//     locality: "",
//     area: "",
//     city: "",
//     state: "",
//     landmark: "",
//     phone: null,
//   });

//   const onChangeHandler = (e) => {
//     setAddress((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };



// const saveAddressHandler = async (e) => {
//     e.preventDefault();
  
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
  
//       const response = await 
//         httpService.post(
//           `${apiURL}/address/add-address`,
//           {
//             addressDetails: address,
//           },
//           config
//         )
//         .then((res) => {
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: 'Address addded',
//                 showConfirmButton: false,
//                 timer: 1500
//               })
//             getSavedAddress()
//             return res.data})
//         .catch((err) => {
//           console.log(err);
//         });
 
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   return (
//     <div className={styles.modal}>
// <h1>New Address</h1>
    
//     <div>
//     <form style={{borderStyle:"none"}} >
//       {/* <div className="row  mb-8">
//         <div className="col">
//           <div className=" ">
//             <h4>{user.name}</h4>
//           </div>
//         </div>
//         <div className="col">
//           <div className=" ">
//             <h4>{user.phone}</h4>
//           </div>
//         </div>
//       </div> */}

//       {/* <!-- Number input --> */}
    

//       {/* <!-- locality input --> */}
//       <div className="   mb-8">
//          <input style={{width:'200px' , border:'1px solid'}}
//           type="text"
//           id="form7Example5"
//           className="form-control"
//           value={address.area}
//           name="area"
//           onChange={onChangeHandler}
//         />
//         <label className="form-label" for="form7Example5">
//           Address(Area and street)
//         </label>
//       </div>
//       <div className="  mb-8">
//          <input style={{width:'200px'}}
//           type="text"
//           id="form7Example4"
//           className="form-control"
//           value={address.locality}
//           name="locality"
//           onChange={onChangeHandler}
//         />
//         <label className="form-label" for="form7Example4">
//           Locality
//         </label>
//       </div>
//       <div className="   mb-8">
//          <input style={{width:'200px'}}
//           type="text"
//           id="form7Example6"
//           className="form-control"
//           value={address.city}
//           name="city"
//           onChange={onChangeHandler}
//         />
//         <label className="form-label" for="form7Example6">
//           City/DIstrict/Town
//         </label>
//       </div>
//       <div className="   mb-8">
//          <input style={{width:'200px'}}
//           type="text"
//           id="form7Example6"
//           className="form-control"
//           value={address.state}
//           name="state"
//           onChange={onChangeHandler}
//         />
//         <label className="form-label" for="form7Example6">
//           State
//         </label>
//       </div>

     
//       <div className="  mb-8">
//          <input style={{width:'200px', border:'solid 1px'}}
//           type="number"
//           id="form7Example3"
//           className=""
//           value={address.pincode}
//           name="pincode"
//           onChange={onChangeHandler}
//         />
//         <label className="form-label" for="form7Example3">
//           Pincode
//         </label>
//       </div>

//       {/* <!-- area input --> */}
    

//       {/* <!-- Number input --> */}
     

    
//       {/* <!-- Message input --> */}
//       <div className="   mb-8">
//          <input style={{width:'200px'}}
//           className="form-control"
//           id="form7Example7"
//           rows="4"
//           value={address.landmark}
//           name="landmark"
//           onChange={onChangeHandler}
//         ></input>
//         <label className="form-label" for="form7Example7">
//           Landmark(optional)
//         </label>
//       </div>
//       <div className="   mb-8">
//          <input style={{width:'200px'}}
//           className="form-control"
//           id="form7Example7"
//           rows="4"
//           value={address.phone}
//           name="phone"
//           onChange={onChangeHandler}
//         ></input>
//         <label className="form-label" for="form7Example7">
//           Phone number
//         </label>
//       </div>
//       {/* <!-- Checkbox --> */}
//       <button
//         style={{ backgroundColor: "green", borderRadius: "2px", width:'100px',height:'40px' }}
//         onClick={saveAddressHandler}
//       >
//         save
//       </button>
//     </form>
//   </div>
//   </div>
//   )
// }

// export default NewAddress


import React from "react";
import styles from './NewAddress.module.css';
import { useState } from "react";
import {AiOutlineLeft} from 'react-icons/ai'
function NewAddress() {
  return (

      <div className={styles.formdiv}>
          <div className={styles.divresponsive}>
            
          <input className={`h-12 w-1/3 mt-3 border-1 border-gray-300 rounded ${styles.responsiveinput}`} type="text"  placeholder="State" />
          <input className={`h-12 w-1/3 mt-3 ml-3   border-1 border-gray-300 rounded ${styles.responsiveinput1}`}  type="text" placeholder="City" />
          </div>
          
          <input className={styles.inputbox} type="text" placeholder="Address" />
          <input className={styles.inputbox} type="text" placeholder="Locality " />
          <div className={styles.divresponsive}>

          </div>
          <input className={styles.inputbox} type="phone" placeholder="Phone-Number" />
          <button className={styles.button}>
            Add This Address
          </button>
        <div className={styles.return}>
        {/* <div className="mt-3 text-red-600"><AiOutlineLeft/></div> */}
        </div>
      </div>
  );
}

export default NewAddress;