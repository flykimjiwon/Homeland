import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
<<<<<<< HEAD

function NoticeEdit() {
=======
import backEndUrl from "../setup/hld_url";

function NoticeEdit() {
  const BEUrl = backEndUrl;
>>>>>>> dev
  const history = useHistory();
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
<<<<<<< HEAD
  const getMovie = () => {
    axios({
      url: `http://localhost:8080/api/v1/notice/${id}`,
=======
  const getNotice = () => {
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
>>>>>>> dev
      method: "get",
    })
      .then((res) => {
        setNewTitle(res.data.title);
        setNewContent(res.data.content);
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
  const handleNewTitle = (event) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };
  const handleNewContent = (event) => {
    event.preventDefault();
    setNewContent(event.target.value);
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const onEditNotice = (event) => {
    event.preventDefault();
    axios({
<<<<<<< HEAD
      url: `http://localhost:8080/api/v1/notice/${id}`,
=======
      url: `${BEUrl}/api/v1/notice/${id}`,
>>>>>>> dev
      method: "put",
      headers: setToken(),
      data: {
        title: newTitle,
        content: newContent,
      },
    })
      .then(() => {
        history.push(`/notice-detail/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="mt-3">공지 수정</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formChangeTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            value={newTitle}
            onChange={handleNewTitle}
            type="text"
            placeholder="변경할 제목을 입력하세요."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formChangeContent">
          <Form.Label>내용</Form.Label>
          <Form.Control
            value={newContent}
            onChange={handleNewContent}
            as="textarea"
            placeholder="변경할 내용을 입력하세요."
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onEditNotice}>
            확인
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NoticeEdit;
