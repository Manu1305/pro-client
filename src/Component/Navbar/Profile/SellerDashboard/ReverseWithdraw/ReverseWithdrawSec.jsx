import React, { useEffect, useState } from "react";
import axios from "axios";
import styless from "./Reverse.module.css"
import DataTable from "datatables.net-dt";
import { apiURL } from "../../../../../const/config";



const UserTable = ({ onDelete }) => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${apiURL}/user/allUserData`);
      console.log("users", res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);




  return (
    <>
      <div className={styless.ljhgf}>
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>{user.urType}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                {/* <td>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
