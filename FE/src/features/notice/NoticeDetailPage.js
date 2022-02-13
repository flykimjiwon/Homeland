/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "./NoticeDetailPage.css";
import "dayjs/locale/ko";

dayjs.locale("ko");

function NoticeDetailPage() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  const [userAuthority, setUserAuthority] = useState("");
  const token = localStorage.getItem("jwt");
  const setToken = () => {
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const getAuthority = () => {
    if (token) {
      axios({
        url: `${BEUrl}/api/v1/users/check-authority`,
        method: "get",
        headers: setToken(),
      }).then((res) => {
        setUserAuthority(res.data);
      });
    }
  };
  const getNotice = () => {
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
      method: "get",
    })
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getNotice, [BEUrl, id]);
  useEffect(getAuthority, []);

  const onDeleteNotice = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
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
    <div className="notice-detail">
      <h1>글 세부사항</h1>
      <div>
        <h4>제목: {notice.title}</h4>
        <p>
          작성시간: {dayjs(notice.updatedAt).format("YYYY년 MM월 DD일 HH:mm")}
        </p>
        <p>내용: {notice.content}</p>
      </div>
      {userAuthority === "admin" ? (
        <div>
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
            </Form.Group>
          </Form>
        </div>
      ) : null}
      <Link to="/notice">
        <Button>목록</Button>
      </Link>
    </div>
  );
}

export default NoticeDetailPage;
