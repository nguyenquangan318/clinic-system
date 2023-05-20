import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Image from "next/image";

const Message = ({ message, sec }) => {
  const { currentUser } = useContext(AuthContext);
  const currDate = new Date().getTime() / 1000;
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
        {currDate - sec <= 500 && <span>just now</span>}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <Image src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
