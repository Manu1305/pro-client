import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { allNotifications } from "../../../../const/api";

function Notification() {
  const [notif, setNotif] = useState([]);
  const getNoti = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const notifi = await allNotifications(config);
    console.log(notifi);

    setNotif(notifi);
  };
  useEffect(() => {
    getNoti();
  }, []);
  return (
    <>
      {notif?.map((item, index) => (
        <Accordion className="mt-20" defaultActiveKey={[index]}>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{item.heading}</Accordion.Header>
            <Accordion.Body>
            {item.message}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
}

export default Notification;