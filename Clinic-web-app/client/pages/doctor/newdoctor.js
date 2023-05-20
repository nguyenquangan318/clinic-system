import React, { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function newdoctor() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [avatar, setAvatar] = useState({});

  const { doRequest, errors } = useRequest({
    url: "/api/doctor",
    method: "post",
    body: {
      name,
      phone,
      department,
      avatar,
    },
    onSuccess: () => {
      Router.push("/doctor");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

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
          <h1 className="text-center">Thêm nhân viên</h1>
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
            <label className="mb-1">Số điện thoại</label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Chức vụ</label>
            <input
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Ảnh đại diện</label>
            <input
              type="file"
              name="avatar"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onload = function () {
                  const base64String = reader.result.replace(/^.+,/, "");
                  setAvatar({
                    data: base64String,
                    contenType: e.target.files[0].type,
                  });
                };
                reader.readAsDataURL(e.target.files[0]);
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

export default newdoctor;
