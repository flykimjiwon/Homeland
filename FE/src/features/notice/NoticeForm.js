import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function NoticeForm() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const onCreateNotice = (event) => {
    event.preventDefault();
    axios({
      url: "http://localhost:8080/api/v1/notice",
      method: "post",
      headers: setToken(),
      data: {
        title: title,
        content: content,
      },
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
      <h1 className="mt-3">공지사항 작성</h1>
      <Form className="container mypage-form">
        <Form.Group className="mb-3" controlId="formNoticeTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            value={title}
            onChange={handleTitle}
            type="text"
            placeholder="제목을 입력하세요."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNoticeContent">
          <Form.Label>내용</Form.Label>
          <Form.Control
            value={content}
            onChange={handleContent}
            as="textarea"
            placeholder="내용을 입력하세요."
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onCreateNotice}>
            작성하기
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NoticeForm;
