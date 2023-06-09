import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import useRequest from "../../hooks/useRequest";

function newappointment() {
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const updateAppointment =
    typeof window !== "undefined"
      ? localStorage.getItem("updateAppointment")
      : null;
  useEffect(() => {
    // Perform localStorage action
    setDate(JSON.parse(updateAppointment).date);
    setDoctorId(JSON.parse(updateAppointment).doctor.id);
    setPatientId(JSON.parse(updateAppointment).patient.id);
    setAppointmentId(JSON.parse(updateAppointment).id);
    return () => {};
  }, []);

  const { doRequest, errors } = useRequest({
    url: `/api/appointment/${appointmentId}`,
    method: "put",
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
          <h1 className="text-center">Cập nhật lịch hẹn</h1>
          <div className="mb-3 form-group">
            <label className="mb-1">Thời gian</label>
            <input
              value={date.slice(0, 16)}
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

          {errors}
          <div className="text-center">
            <button className="btn btn-primary ">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default newappointment;
