import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const Chat = () => {
  const { data } = useContext(ChatContext);

  async function handleAdd() {
    if (data.user.id) {
      const q = query(collection(db, "users"), where("id", "==", data.user.id));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const { name, email, age, address, phone, id } = doc.data();
          axios
            .post("/api/patient", {
              name,
              email,
              age,
              address,
              phone,
            })
            .then((res) => window.alert("Thêm khách hàng thành công"))
            .catch((err) => window.alert("Thông tin không hợp lệ"));
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.name}</span>
        <div className="chatIcons">
          <span onClick={handleAdd}>+ add patient</span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
