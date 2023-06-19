import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function newaccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const doctorList = await axios.get("/api/doctor");
      setDoctors(doctorList.data.doctor);
    };
    fetchData();
    return () => {};
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/user/signup",
    method: "post",
    body: {
      email,
      password,
      clinicName: doctorName,
      address: currentUser.address,
      phone: doctorPhone,
      role,
      id: doctorId,
    },
    onSuccess: async (data) => {
      console.log(data);
      await setDoc(doc(db, "users", data.id), {
        email,
        clinicName: doctorName,
        address: currentUser.address,
        phone: doctorPhone,
        role,
        id: data.id,
      });
      await setDoc(doc(db, "userChats", data.id), {});
      Router.push("/doctor");
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
          <h1 className="text-center">Tạo tài khoản nhân viên </h1>
          <div className="form-group">
            <label className="mb-1">Bác sĩ</label>
            <select
              onChange={(e) => {
                const selectedIndex = e.target.options.selectedIndex;
                setDoctorPhone(
                  e.target.options[selectedIndex].getAttribute("phone")
                );
                setDoctorName(
                  e.target.options[selectedIndex].getAttribute("name")
                );
                setDoctorId(
                  e.target.options[selectedIndex].getAttribute("doctorid")
                );
              }}
              className="mb-3 form-control"
            >
              <option>Danh sách bác sĩ</option>
              {doctors.map((doc) => (
                <option
                  key={doc.id}
                  phone={doc.phone}
                  name={doc.name}
                  doctorid={doc.id}
                >
                  {`${doc.name} ${doc.department}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="mb-1">Role</label>
            <select
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="mb-3 form-control"
            >
              <option>doctor</option>
              <option>admin</option>
            </select>
          </div>
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
          {errors}
          <div className="text-center">
            <button className="btn btn-primary ">signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default newaccount;
