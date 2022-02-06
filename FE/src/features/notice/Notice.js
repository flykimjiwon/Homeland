/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Table, Pagination, Button, Container } from "react-bootstrap";
import "./Notice.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";

function Notice() {
  const BEUrl = backEndUrl;
  const [noticeItems, setNoticeItems] = useState([]);
  const getNoticeItems = () => {
    axios({
      url: `${BEUrl}/api/v1/notice`,
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
      <Link to="/notice-form">
        <Button>글 작성</Button>
      </Link>
    </div>
  );
}

export default Notice;
