import Router from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import buildClient from "../api/buildClient";
import Card from "../components/Card";
import axios from "axios";

function dashboard({ currentUser }) {
  const [appointment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      Router.push("/auth/signin");
    }
    const fetchData = async () => {
      const res = await axios.get("/api/appointment");
      setAppointment(res.data.appointment);
      const doctors = await axios.get("/api/doctor?page=1&size=4");
      setDoctor(doctors.data.doctor);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <div style={{ width: "100%", background: "#f8f9fb" }}>
      <div className="content-wrapper pb-0">
        <div className="row pt-3">
          <div className="col-xl-8 stretch-card grid-margin">
            <div className="title-banner">
              <div className="d-lg-flex justify-content-between">
                <div className="mr-4">
                  <h3>How are feeling today ?</h3>
                  <p className="m-0">
                    Get unlimited doctor consultations and much more with
                    CliniCare
                  </p>
                </div>
                <img
                  src="https://www.bootstrapdash.com/demo/plus-staging/template/assets/images/dashboard/hospital/banner-thumb.png"
                  alt="#"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 stretch-card grid-margin">
            <div className="card">
              <div className="time-banner">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center border-right pe-3">
                    <i className="mdi mdi-clock-outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#0033c4"
                          d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"
                        />
                      </svg>
                    </i>
                    <h6 className="m-0 font-weight-normal">Open Hours</h6>
                  </div>
                  <div className="ps-3">
                    <p className="m-0">Monday-Saturday: 8.00 - 21.00</p>
                    <p className="m-0">Sunday: 8.30 - 20.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Card
            d="M19 8c.56 0 1 .43 1 1a1 1 0 0 1-1 1c-.57 0-1-.45-1-1c0-.57.43-1 1-1M2 2v9c0 2.96 2.19 5.5 5.14 5.91c.62 3.01 3.28 5.09 6.36 5.09a6.5 6.5 0 0 0 6.5-6.5v-3.69c1.16-.42 2-1.52 2-2.81a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 1.29.84 2.4 2 2.81v3.6c0 2.5-2 4.5-4.5 4.5c-2 0-3.68-1.21-4.28-3.01C12 16.3 14 13.8 14 11V2h-4v3h2v6a4 4 0 0 1-4 4a4 4 0 0 1-4-4V5h2V2H2Z"
            text="Bác sĩ"
            number="3957"
          ></Card>
          <Card
            d="M18 18.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5A1.5 1.5 0 0 0 7.5 17A1.5 1.5 0 0 0 6 15.5A1.5 1.5 0 0 0 4.5 17A1.5 1.5 0 0 0 6 18.5M20 8l3 4v5h-2a3 3 0 0 1-3 3a3 3 0 0 1-3-3H9a3 3 0 0 1-3 3a3 3 0 0 1-3-3H1V6c0-1.11.89-2 2-2h14v4h3M8 6v3H5v2h3v3h2v-3h3V9h-3V6H8Z"
            text="Khách hàng"
            number="3957"
          ></Card>
          <Card
            d="M12 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m-1 20H8v-6H6V9h12v7h-2v6h-3v-4h-2v4Z"
            text="Y tá"
            number="3957"
          ></Card>
          <Card
            d="M10 3L8 5v2H5C3.85 7 3.12 8 3 9L2 19c-.12 1 .54 2 2 2h16c1.46 0 2.12-1 2-2L21 9c-.12-1-.94-2-2-2h-3V5l-2-2h-4m0 2h4v2h-4V5m1 5h2v3h3v2h-3v3h-2v-3H8v-2h3v-3Z"
            text="Dược sĩ"
            number="3957"
          ></Card>
          <Card
            d="M15 13h1.5v2.82l2.44 1.41l-.75 1.3L15 16.69V13m4-5H5v11h4.67c-.43-.91-.67-1.93-.67-3a7 7 0 0 1 7-7c1.07 0 2.09.24 3 .67V8M5 21a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2v6.1c1.24 1.26 2 2.99 2 4.9a7 7 0 0 1-7 7c-1.91 0-3.64-.76-4.9-2H5m11-9.85A4.85 4.85 0 0 0 11.15 16c0 2.68 2.17 4.85 4.85 4.85A4.85 4.85 0 0 0 20.85 16c0-2.68-2.17-4.85-4.85-4.85Z"
            text="Lịch hẹn"
            number="3957"
          ></Card>
          <Card
            d="M14 17H7v-2h7m3-2H7v-2h10m0-2H7V7h10m2-4H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
            text="Báo cáo"
            number="3957"
          ></Card>
        </div>

        <div className="row">
          <div className="col-xl-3 col-sm-4 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Doctors list</div>
                {doctor &&
                  doctor.map((doc) => (
                    <div
                      className="item-list d-flex align-items-center"
                      key={doc.id}
                    >
                      <img
                        src={`data:${doc.avatar?.contentType};base64,${doc.avatar?.data}`}
                        alt=""
                      />
                      <div>
                        <h6 className="mb-0">{doc.name}</h6>
                        <p className="m-0" style={{ fontSize: "12px" }}>
                          {doc.department}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-sm-8 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-lg-flex justify-content-between">
                  <h4 className="card-title">Lịch hẹn gần nhất </h4>
                </div>
                <div className="table-responsive custom-datatable">
                  <table
                    id="order-listing"
                    className="table table-striped apointment-table"
                  >
                    <thead>
                      <tr>
                        <th> Khách hàng </th>
                        <th> Bác sĩ </th>
                        <th> Ngày </th>
                        <th> Giờ </th>
                        <th> Liên hệ </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointment &&
                        appointment.map((appointment) => (
                          <tr key={appointment.id} style={{ height: "55px" }}>
                            <td>{appointment.patient.name}</td>
                            <td>
                              <img
                                className="mx-2"  
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "100%",
                                }}
                                src={`data:${appointment.doctor.avatar?.contentType};base64,${appointment.doctor.avatar?.data}`}
                                alt=""
                              />
                              {appointment.doctor.name}
                            </td>
                            <td>
                              {new Date(appointment.date).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(appointment.date).toLocaleTimeString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            <td>{appointment.patient.phone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Tổng số khách hàng</h5>
                <Line
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [50, 60, 40, 50, 70, 90, 80],
                        label: "Khách hàng cũ",
                        borderColor: "#3e95cd",
                        fill: false,
                      },
                      {
                        data: [50, 30, 50, 60, 60, 80, 70],
                        label: "Khách hàng mới",
                        borderColor: "#3cba9f",
                        fill: false,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Báo cáo bệnh lý</h5>
                <Doughnut
                  data={{
                    labels: [
                      "Xương khớp",
                      "Bệnh thông thường",
                      "Mắt",
                      "Tai mũi họng",
                      "Thần kinh",
                    ],
                    datasets: [
                      {
                        backgroundColor: [
                          "#3e95cd",
                          "#8e5ea2",
                          "#3cba9f",
                          "#e8c3b9",
                          "#c45850",
                        ],
                        data: [2478, 5267, 734, 784, 433],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

dashboard.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/user/currentUser");
  return data;
};

export default dashboard;
