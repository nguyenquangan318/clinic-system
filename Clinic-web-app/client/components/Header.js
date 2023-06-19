import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Đăng ký", href: "/auth/signup" },
    !currentUser && { label: "Đăng nhập", href: "/auth/signin" },
    currentUser && { label: "Đăng xuất", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <div key={href} className="nav-item">
          <Link
            href={href}
            className="text-white nav-link"
            style={{ textDecoration: "none", padding: "10px" }}
          >
            {label}
          </Link>
        </div>
      );
    });

  function ConditionHeader() {
    if (currentUser) {
      if (currentUser.role == "admin") {
        return (
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-white" href="/dashboard">
                Dashboard <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/doctor">
                Nhân viên
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/patient">
                Khách hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/appointment">
                Lịch hẹn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/chat">
                Nhắn tin
              </Link>
            </li>
          </ul>
        );
      }
      if (currentUser.role == "doctor") {
        return (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" href="/doctor/appointment">
                Lịch hẹn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/chat">
                Nhắn tin
              </Link>
            </li>
          </ul>
        );
      }
    }
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light text-white"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          color: "white",
          backgroundColor: "#0033c4",
        }}
      >
        <Link className="navbar-brand text-white" href="/dashboard">
          CliniCare
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ConditionHeader />
        </div>
        <div className="d-flex justify-content-end">
          <ul className=" nav d-flex justify-item-center"></ul>
          {links}
        </div>
      </nav>
    </div>
  );
};

export default Header;
