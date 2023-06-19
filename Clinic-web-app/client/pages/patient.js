import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Router from "next/router";
import { AuthContext } from "../context/AuthContext";
import { PaginationControl } from "react-bootstrap-pagination-control";

function patient() {
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    if (currentUser?.role == "doctor") {
      Router.push("/doctor/appointment");
    }
    const fetchData = async () => {
      const res = await axios.get(`/api/patient?page=${page}&size=9`);
      setPatient(res.data.patient);
    };
    fetchData();
    return () => {};
  }, [page, value]);

  return (
    <div style={{ width: "100%", background: "#f8f9fb" }}>
      <div className="content-wrapper pb-0">
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="mb-3"
            style={{ backgroundColor: "#0033c4" }}
            onClick={() => Router.push("/patient/newpatient")}
          >
            + Thêm bệnh nhân
          </Button>
          <input
            style={{ width: "40%" }}
            placeholder="Search patient by Name"
            onChange={async (e) => {
              const res = await axios.get(
                `/api/patient/search?name=${e.target.value}`
              );
              setPatient(res.data.patient);
            }}
            className="mb-3 form-control"
          ></input>
        </div>
        <Table bordered hover style={{ background: "white" }}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Tuổi</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            {patient &&
              patient.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="align-middle">
                      <h6 className="mb-0">
                        <div> {patient.name}</div>
                      </h6>
                    </div>
                  </td>
                  <td className="align-middle">
                    <h6>{patient.email}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{patient.age}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{patient.address}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{patient.phone}</h6>
                  </td>
                  <td className="align-middle" style={{ width: "18%" }}>
                    <div className="d-flex justify-content-around">
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            "updatePatient",
                            JSON.stringify(patient)
                          );
                          Router.push("/patient/updatepatient");
                        }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (confirm("Deleted patient") == true) {
                            axios.delete(`/api/patient/${patient.id}`);
                            setValue((value) => value + 1);
                          } else {
                          }
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <PaginationControl
          page={page}
          between={4}
          total={250}
          limit={20}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
}

export default patient;
