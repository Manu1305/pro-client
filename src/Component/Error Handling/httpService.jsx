import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response >= 400 && error.response < 500;




    console.warn(error.response.config.url)
    console.warn(error.response)

  if (!expectedError) {
    //console.log('Logging the error', error);
    console.log("error")
    toast.error(`error ${error.response.config.url}`, {
      position: "top-center",
      autoClose: 2500,
    // toast.error(`error ${error.response.config.url}`, {
    //   position: "top-center",
    //   autoClose: 2500,
      
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch:axios.patch,
};
