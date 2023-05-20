import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import useRequest from "../../hooks/useRequest";

function newappointment() {
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState();
  const [dateErr, setDateErr] = useState(false);

  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const doctorList = await axios.get("/api/doctor");
      const patientList = await axios.get("/api/patient");
      setDoctor(doctorList.data.doctor);
      setPatient(patientList.data.patient);
    };
    fetchData();
    return () => {};
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/appointment",
    method: "post",
    body: {
      date,
      patientId,
      doctorId,
    },
    onSuccess: () => {
      Router.push("/appointment");
    },
  });

  const onSubmit = async (event) => {
    if (dateErr) {
      return;
    }
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
          <h1 className="text-center">Thêm lịch hẹn</h1>
          <div className="mb-3 form-group">
            <label className="mb-1">Thời gian</label>
            <input
              value={date}
              type="datetime-local"
              onChange={(e) => {
                const currentDate = new Date();
                const appointDate = new Date(e.target.value);
                setDateErr(currentDate > appointDate);
                setDate(e.target.value);
              }}
              className="form-control"
            ></input>
          </div>
          {dateErr ? (
            <div className="alert alert-danger">
              please provide a valid date
            </div>
          ) : null}
          <div className="form-group">
            <label className="mb-1">Bác sĩ</label>
            <select
              onChange={(e) => {
                const selectedIndex = e.target.options.selectedIndex;
                setDoctorId(
                  e.target.options[selectedIndex].getAttribute("doctorid")
                );
              }}
              className="mb-3 form-control"
            >
              <option>Danh sách bác sĩ</option>
              {doctor.map((doc) => (
                <option key={doc.id} doctorid={doc.id}>
                  {`${doc.name} ${doc.department}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="mb-1">Khách hàng</label>
            <select
              onChange={(e) => {
                const selectedIndex = e.target.options.selectedIndex;
                setPatientId(
                  e.target.options[selectedIndex].getAttribute("patientid")
                );
              }}
              className="mb-3 form-control"
            >
              <option>Danh sách khách hàng</option>
              {patient.map((patient) => (
                <option
                  key={patient.id}
                  patientid={patient.id}
                >{`${patient.name} số điện thoại: ${patient.phone}`}</option>
              ))}
            </select>
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

export default newappointment;
