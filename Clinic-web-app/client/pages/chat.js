import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function chat() {
  return (
    <div style={{ width: "100%", background: "#f8f9fb" }}>
      <div className="content-wrapper pb-0">
        <div className="home">
          <div className="container">
            <Sidebar />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default chat;
