/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import "./Notice.css";
import { Link } from "react-router-dom";
import axios from "axios";
import NoticeDetail from "./NoticeDetail";

function Notice() {
  const [noticeItems, setNoticeItems] = useState([]);
  const getNoticeItems = () => {
    axios({
      url: "http://localhost:8080/api/v1/notice",
      method: "get",
    })
      .then((res) => {
        setNoticeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getNoticeItems, []);
  return (
    <div className="mt-3">
      <h1>공지사항입니다.</h1>
      <ul>
        {noticeItems.map((item, index) => {
          return (
            <NoticeDetail
              key={index}
              id={item.id}
              title={item.title}
              updatedAt={item.updatedAt}
            />
          );
        })}
      </ul>
      <Link to="/notice-form">
        <Button>글 작성</Button>
      </Link>
    </div>
  );
}

export default Notice;
