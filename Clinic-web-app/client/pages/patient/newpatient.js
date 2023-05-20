import React, { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function newpatient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("None");
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/patient",
    method: "post",
    body: {
      name,
      email,
      age,
      address,
      phone,
    },
    onSuccess: () => {
      Router.push("/patient");
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
          <h1 className="text-center">Thêm bệnh nhân</h1>
          <div className="mb-3 form-group">
            <label className="mb-1">Họ và tên</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Tuổi</label>
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
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
            <button className="btn btn-primary ">Thêm</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default newpatient;
