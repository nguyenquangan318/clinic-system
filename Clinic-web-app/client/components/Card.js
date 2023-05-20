import React from "react";

function Card({ d, text, number }) {
  return (
    <div className="col-xl-2 col-sm-4 stretch-card grid-margin">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="text-center hospital-features">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="33"
              viewBox="0 0 24 24"
            >
              <path fill="#ff0854" d={d} />
            </svg>
            <h6 className="font-weight-normal">{text}</h6>
            <h6>{number}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
