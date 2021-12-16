import React from "react";
import { useLocation } from "react-router-dom";
import { pathImgFromIndex } from "../../utils/constants";

function SubmitHomework(props) {
  const homework = useLocation();
  console.log(homework);
  return (
    <div className="submit-homework container">
      <div className="logo-class">
        <div className="classname">TOÁN 6</div>
      </div>
      <div className="content">
        <div className="homework-detail">
          <img
            src={pathImgFromIndex + "homework_icon.png"}
            alt="homework-icon"
            height="100"
          />
          <div className="detail">
            <h3 className="name">Nhân biểu thức</h3>
            <div className="sub-detail">
              <p>
              <span>Ngày đăng:</span> 17.11.2021
              </p>
              <p>
              <span> Đến hạn: 25.11.2021
              </p>
              <p>
              <span> Điểm bài tập: 100</span>
              </p>
            </div>
          </div>
        </div>
        <div className="submit"></div>
      </div>
    </div>
  );
}

export default SubmitHomework;
