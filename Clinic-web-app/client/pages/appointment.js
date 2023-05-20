import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Router from "next/router";
import { PaginationControl } from "react-bootstrap-pagination-control";

function appointment() {
  const [page, setPage] = useState(1);
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const appointments = await axios.get(
        `/api/appointment?page=${page}&size=5`
      );
      setAppointment(appointments.data.appointment);
    };
    fetchData();
    return () => {};
  }, [page]);

  return (
    <div style={{ width: "100%", background: "#f8f9fb" }}>
      <div className="content-wrapper pb-0">
        <Button
          variant="primary"
          className="mb-3"
          style={{ backgroundColor: "#0033c4" }}
          onClick={() => Router.push("/appointment/newappointment")}
        >
          + Thêm lịch hẹn
        </Button>
        <Table bordered hover style={{ background: "white" }}>
          <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Lịch hẹn</th>
              <th>Khách hàng</th>
              <th>Liên lạc</th>
            </tr>
          </thead>
          <tbody>
            {appointment &&
              appointment.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className="item-list d-flex align-items-center">
                      <img
                        src={`data:${appointment.doctor.avatar?.contentType};base64,${appointment.doctor.avatar?.data}`}
                        alt=""
                      />
                      <h6 className="mb-0">
                        <div> {appointment.doctor.name}</div>
                      </h6>
                    </div>
                  </td>
                  <td className="align-middle">
                    <h6>
                      {new Date(appointment.date).toLocaleTimeString("en-US", {
                        timeZone: "UTC",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </h6>
                    <h6>{new Date(appointment.date).toLocaleDateString()}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{appointment.patient.name}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{appointment.patient.phone}</h6>
                  </td>
                  <td className="align-middle" style={{ width: "18%" }}>
                    <div className="d-flex justify-content-around">
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            "updateAppointment",
                            JSON.stringify(appointment)
                          );
                          Router.push("/appointment/updateappointment");
                        }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (confirm("Deleted appointment") == true) {
                            axios.delete(`/api/appointment/${appointment.id}`);
                            window.location.reload();
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

export default appointment;
