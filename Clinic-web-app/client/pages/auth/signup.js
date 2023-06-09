import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/user/signup",
    method: "post",
    body: {
      email,
      password,
      clinicName,
      address,
      phone,
      role: "admin",
    },
    onSuccess: async (data) => {
      console.log(data);
      await setDoc(doc(db, "users", data.id), {
        email,
        clinicName,
        address,
        phone,
        role: "admin",
        id: data.id,
      });
      await setDoc(doc(db, "userChats", data.id), {});
      Router.push("/");
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#f8f9fb", height: "100vh" }}
    >
      <div className="w-50 container ">
        <form
          className="p-3"
          onSubmit={onSubmit}
          style={{ backgroundColor: "white" }}
        >
          <h1 className="text-center">Đăng ký</h1>
          <div className="mb-3 form-group">
            <label className="mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Mật khẩu</label>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Tên phòng khám</label>
            <input
              value={clinicName}
              onChange={(e) => {
                setClinicName(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Địa chỉ</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Số điện thoại</label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          {errors}
          <div className="text-center">
            <button className="btn btn-primary ">signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signup;
