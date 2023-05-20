import React, { useState, useEffect, useRef } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

function updatedoctor() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [avatar, setAvatar] = useState({});
  const [doctor, setDoctor] = useState();
  const imageRef = useRef();
  const updateDoctor =
    typeof window !== "undefined" ? localStorage.getItem("updateDoctor") : null;

  const { doRequest, errors } = useRequest({
    url: `/api/doctor/${doctor?.id}`,
    method: "put",
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

  useEffect(() => {
    // Perform localStorage action
    setDoctor(JSON.parse(updateDoctor));
    setName(JSON.parse(updateDoctor).name);
    setPhone(JSON.parse(updateDoctor).phone);
    setDepartment(JSON.parse(updateDoctor).department);
    setAvatar(JSON.parse(updateDoctor).avatar);
  }, []);

  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#f8f9fb", height: "100vh" }}
    >
      {doctor && (
        <div className="w-50 container ">
          <form
            className="p-3"
            onSubmit={onSubmit}
            style={{ backgroundColor: "white" }}
          >
            <h1 className="text-center">Cập nhật thông tin nhân viên</h1>
            <div className="form-group">
              <label className="mb-1">Ảnh đại diện</label>
              <div style={{ marginBottom: "10px" }}>
                <img
                  ref={imageRef}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "40%",
                  }}
                  src={`data:${doctor.avatar?.contentType};base64,${doctor.avatar?.data}`}
                  alt=""
                />
              </div>
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
                    imageRef.current.src = `data:${e.target.files[0].type};base64,${base64String}`;
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
                className="mb-3 form-control"
              ></input>
            </div>
            <div className="form-group">
              <label className="mb-1">chức vụ</label>
              <input
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                className="mb-3 form-control"
              ></input>
            </div>
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
            {errors}
            <div className="text-center">
              <button className="btn btn-primary ">Cập nhật</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default updatedoctor;
