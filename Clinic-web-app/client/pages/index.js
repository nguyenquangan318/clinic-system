import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../hooks/useRequest";
import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  useEffect(() => {
    if (currentUser) {
      Router.push("/dashboard");
    }
    return () => {};
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/user/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/dashboard");
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
          <h1 className="text-center">Đăng nhập</h1>
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
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mb-3 form-control"
            ></input>
          </div>
          {errors}
          <div className="text-center">
            <button className="btn btn-primary ">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/user/currentUser");
  return data;
};

export default LandingPage;
