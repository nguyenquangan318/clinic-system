import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Router from "next/router";
import { PaginationControl } from "react-bootstrap-pagination-control";

function doctor() {
  const [page, setPage] = useState(1);
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/doctor?page=${page}&size=5`);
      setDoctor(res.data.doctor);
    };
    fetchData();
    return () => {};
  }, [page]);
  return (
    <div style={{ width: "100%", background: "#f8f9fb" }}>
      <div className="content-wrapper pb-0">
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="mb-3"
            style={{ backgroundColor: "#0033c4" }}
            onClick={() => Router.push("/doctor/newdoctor")}
          >
            + Thêm nhân viên
          </Button>
          <input
            style={{ width: "40%" }}
            placeholder="Search by Name"
            onChange={async (e) => {
              const res = await axios.get(
                `/api/doctor/search?name=${e.target.value}`
              );
              console.log(res.data);
              setDoctor(res.data.doctor);
            }}
            className="mb-3 form-control"
          ></input>
        </div>
        <Table bordered hover style={{ background: "white" }}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Ngày thêm</th>
            </tr>
          </thead>
          <tbody>
            {doctor &&
              doctor.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="item-list d-flex align-items-center">
                      <img
                        src={`data:${doc.avatar?.contentType};base64,${doc.avatar?.data}`}
                        alt=""
                      />
                      <h6 className="mb-0">
                        <div> {doc.name}</div>
                      </h6>
                    </div>
                  </td>
                  <td className="align-middle">
                    <h6>{doc.phone}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{doc.department}</h6>
                  </td>
                  <td className="align-middle">
                    <h6>{doc.createdAt.substring(0, 10)}</h6>
                  </td>
                  <td className="align-middle" style={{ width: "18%" }}>
                    <div className="d-flex justify-content-around">
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            "updateDoctor",
                            JSON.stringify(doc)
                          );
                          Router.push("/doctor/updatedoctor");
                        }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (confirm("Xác nhận xóa nhân viên?") == true) {
                            axios.delete(`/api/doctor/${doc.id}`);
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

export default doctor;
