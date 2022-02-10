/* eslint-disable */
import "./App.css";
import Notice from "../features/notice/Notice";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Mypage from "../features/auth/Mypage";
import Main from "../features/home/Main";
<<<<<<< HEAD
import MainAccordion from "../features/home/MainAccordion";
=======
>>>>>>> dev
// import Test from "./Test";
import EditProfile from "../features/auth/EditProfile";
import EditPassword from "../features/auth/EditPassword";
import CheckPassword from "../features/auth/CheckPassword";
import CheckEmail from "../features/auth/CheckEmail";
import FindPassword from "../features/auth/FindPassword";
import NoticeForm from "../features/notice/NoticeForm";
import NoticeDetailPage from "../features/notice/NoticeDetailPage";
import NoticeEdit from "../features/notice/NoticeEdit";
<<<<<<< HEAD
=======
import MeetingMain from "../features/home/MeetingMain";
import Home from "../features/home/Home";
>>>>>>> dev

import React, { useContext, useState, lazy, Suspense, useEffect } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Carousel,
  Row,
  Col,
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
<<<<<<< HEAD
  // console.log(isLogin);
  const onIsLogin = (e) => {
    setIsLogin(e);
  };
=======
  const [isSession, setIsSession] = useState(false);
  const onIsLogin = (e) => {
    setIsLogin(e);
  };
  const onIsSession = (data) => {
    setIsSession(data);
  };
>>>>>>> dev

  const onLogout = (event) => {
    event.preventDefault();
    setIsLogin(false);
    localStorage.removeItem("jwt");
    history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            HomeLanDrink
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey="link-1" as={Link} to="/notice">
                공지사항
              </Nav.Link>
            </Nav>

            {isLogin ? (
              <Nav>
                <Nav.Link
                  onClick={onLogout}
                  eventKey="link-4"
                  as={Link}
                  to="/logout"
                >
                  로그아웃
                </Nav.Link>
                <Nav.Link eventKey="link-6" as={Link} to="/mypage">
                  마이페이지
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link eventKey="link-3" as={Link} to="/login">
                  로그인
                </Nav.Link>
                <Nav.Link eventKey="link-5" as={Link} to="/signup">
                  회원가입
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
=======
      {isSession ? null : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              HomeLanDrink
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link eventKey="link-1" as={Link} to="/notice">
                  공지사항
                </Nav.Link>
                <Nav.Link eventKey="link-2" as={Link} to="/meeting-main">
                  참가
                </Nav.Link>
              </Nav>

              {isLogin ? (
                <Nav>
                  <Nav.Link
                    onClick={onLogout}
                    eventKey="link-4"
                    as={Link}
                    to="/logout"
                  >
                    로그아웃
                  </Nav.Link>
                  <Nav.Link eventKey="link-6" as={Link} to="/mypage">
                    마이페이지
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link eventKey="link-3" as={Link} to="/login">
                    로그인
                  </Nav.Link>
                  <Nav.Link eventKey="link-5" as={Link} to="/signup">
                    회원가입
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
>>>>>>> dev

      <Route path="/notice-edit/:id">
        <NoticeEdit />
      </Route>
      <Route path="/notice-form">
        <NoticeForm />
      </Route>
      <Route path="/find-password/:key">
        <FindPassword />
      </Route>
      <Route path="/check-email">
        <CheckEmail />
      </Route>
      <Route path="/notice-detail/:id">
        <NoticeDetailPage />
      </Route>
      <Route path="/editProfile">
        <EditProfile></EditProfile>
      </Route>
      <Route path="/edit-password">
        <EditPassword></EditPassword>
      </Route>
      <Route path="/check-password">
        <CheckPassword></CheckPassword>
      </Route>
      <Route exact path="/">
<<<<<<< HEAD
        <Main onIsLogin={onIsLogin}></Main>
=======
        <Home onIsLogin={onIsLogin}></Home>
>>>>>>> dev
      </Route>
      <Route path="/notice">
        <Notice></Notice>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/mypage">
        <Mypage></Mypage>
      </Route>
<<<<<<< HEAD
=======
      <Route path="/meeting-main">
        <MeetingMain onIsSession={onIsSession} />
      </Route>
>>>>>>> dev
    </div>
  );
}

export default App;
