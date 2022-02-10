import { useState, useEffect } from "react";
<<<<<<< HEAD
import NoticeDetail from "./NoticeDetail";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function NoticeDetailPage() {
  const history = useHistory();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  const getMovie = () => {
    axios({
      url: `http://localhost:8080/api/v1/notice/${id}`,
=======

import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backEndUrl from "../setup/hld_url";

function NoticeDetailPage() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  const getNotice = () => {
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
>>>>>>> dev
      method: "get",
    })
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
<<<<<<< HEAD
  useEffect(getMovie, [id]);
=======
  useEffect(getNotice, [BEUrl, id]);
>>>>>>> dev
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const onDeleteNotice = (event) => {
    event.preventDefault();
    axios({
<<<<<<< HEAD
      url: `http://localhost:8080/api/v1/notice/${id}`,
=======
      url: `${BEUrl}/api/v1/notice/${id}`,
>>>>>>> dev
      method: "delete",
      headers: setToken(),
    })
      .then(() => {
        history.push("/notice");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="mt-3">글 세부사항</h1>
<<<<<<< HEAD
      <NoticeDetail
        key={notice.id}
        id={notice.id}
        title={notice.title}
        content={notice.content}
        updatedAt={notice.updatedAt}
      />
=======
      <div>
        <h4>제목: {notice.title}</h4>
        <p>작성시간: {notice.updatedAt}</p>
        <p>내용: {notice.content}</p>
      </div>
>>>>>>> dev
      <Link
        to={`/notice-edit/${id}`}
        className="d-flex justify-content-center mt-3"
      >
        <Button type="submit">수정하기</Button>
      </Link>
      <Form>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onDeleteNotice}>
            삭제하기
          </Button>
<<<<<<< HEAD
=======
          <Link to="/notice">
            <Button>목록</Button>
          </Link>
>>>>>>> dev
        </Form.Group>
      </Form>
    </div>
  );
}

export default NoticeDetailPage;
