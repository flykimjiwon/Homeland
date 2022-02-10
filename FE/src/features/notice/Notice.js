/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
<<<<<<< HEAD
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
=======
import { Table, Pagination, Button, Container } from "react-bootstrap";
import "./Notice.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";

function Notice() {
  const BEUrl = backEndUrl;
  const [noticeItems, setNoticeItems] = useState([]);
  const [userAuthority, setUserAuthority] = useState("");
  const getNoticeItems = () => {
    axios({
      url: `${BEUrl}/api/v1/notice`,
>>>>>>> dev
      method: "get",
    })
      .then((res) => {
        setNoticeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
<<<<<<< HEAD
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
=======
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const getAuthority = () => {
    axios({
      url: `${BEUrl}/api/v1/users/check-authority`,
      method: "get",
      headers: setToken(),
    }).then((res) => {
      setUserAuthority(res.data);
    });
  };
  useEffect(getNoticeItems, []);
  useEffect(getAuthority, []);
  return (
    <div className="mt-3">
      <h1>공지사항입니다.</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {noticeItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/notice-detail/${item.id}`}>{item.title}</Link>
                  </td>
                  <td>{item.updatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      {userAuthority === "admin" ? (
        <Link to="/notice-form">
          <Button>글 작성</Button>
        </Link>
      ) : null}
>>>>>>> dev
    </div>
  );
}

export default Notice;
