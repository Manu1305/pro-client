import { apiURL } from "./config";


const allNotifications = async (config) => {
    try {
      const res = await fetch(
        `${apiURL}/noti/get-user-noti`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
        config
      )
        .then((res) => {
  
          console.log(res)
          return res.json();
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          alert("URL DATA");
          console.log(err);
        });
      return res;
    } catch (error) {
      console.log(error);
      alert("api eror");
    }
  };
  
  export { allNotifications };