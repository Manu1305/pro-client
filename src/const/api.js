import { apiURL } from "./config";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

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
        console.log(res);
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

const getUserAddress = async () => {
  try {
    const res = await fetch(
      `${apiURL}/address/savedaaddress`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
      config
    )
      .then((res) => {
        return res.json();
      })
      .then(res => res)
      .catch((err) => {
        console.log(err)
        alert("address errorb")

      });

    console.log(res);
    return res;
  } catch (error) {
    console.log("API Error", error);
  }
};
export { allNotifications, getUserAddress };
