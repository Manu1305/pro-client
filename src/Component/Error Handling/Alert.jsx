<<<<<<< HEAD
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
=======
// import React, { useEffect } from "react";
>>>>>>> 82725411f559253343fee64f8f8421ab94b5a775

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
export const Alert = ({}) => {

  const msg = useSelector()
  console.log("Alert")
  const notify = () => toast(msg);
  useEffect(() => {
    notify()
  },[])

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
=======
// export const Alert = ({message}) => {
//   console.log("Alert")
//   const notify = () => toast(message);
//   useEffect(() => {
//     notify()
//   },[])

//   return (
//     <div>
//       {/* <button onClick={notify}>Notify!</button> */}
//       <ToastContainer />
//     </div>
//   );
// };
>>>>>>> 82725411f559253343fee64f8f8421ab94b5a775
