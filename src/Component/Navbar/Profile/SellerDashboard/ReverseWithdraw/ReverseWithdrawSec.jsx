// import React, { useEffect, useState } from "react";
// import styless from "./Reverse.module.css"
// import DataTable from "datatables.net-dt";
// import { apiURL } from "../../../../../const/config";
// import httpService from "../../../../Error Handling/httpService";



// const UserTable = ({ onDelete }) => {
//   const [user, setUser] = useState([]);

//   const getUsers = async () => {
//     try {
//       const res = await httpService.get(`${apiURL}/user/allUserData`);
//       console.log("users", res.data);
//       setUser(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);




//   return (
//     <>
//       <div className={styless.ljhgf}>
//         <table style={{ margin: "auto" }}>
//           <thead>
//             <tr>
//               <th>type</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {user.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.urType}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 {/* <td>
//               <button onClick={() => onDelete(user.id)}>Delete</button>
//             </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default UserTable;


import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import styless from "./Reverse.module.css";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import "datatables.net-dt/css/jquery.dataTables.css"; // You might need this if you're using DataTables styles
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
const UserTable = ({ onDelete }) => {
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getUsers = async () => {
    try {
      const res = await httpService.get(`${apiURL}/user/allUserData`);
      console.log("users", res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = user.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className={styless.ljhgf}>
        <Form>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
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
        </Table>
      </div>
    </>
  );
};

export default UserTable;
