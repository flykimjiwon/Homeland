/* eslint-disable */
import "./App.css";
import Notice from "./Notice.js";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Mypage from "./Mypage";
import Main from "./Main";
import MainAccordion from "./MainAccordion.js";
// import Test from "./Test";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import CheckPassword from "./CheckPassword";
import CheckEmail from "./CheckEmail";
import FindPassword from "./FindPassword";
import NoticeForm from "./NoticeForm";
import NoticeDetailPage from "./NoticeDetailPage";
import NoticeEdit from "./NoticeEdit";

import IMG from "./img/a.png";
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
  // console.log(isLogin);
  const onIsLogin = (e) => {
    setIsLogin(e);
  };

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
        <Main onIsLogin={onIsLogin}></Main>
      </Route>
      <Route path="/notice">
        <Notice></Notice>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/logout">
        <Logout></Logout>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/mypage">
        <Mypage></Mypage>
      </Route>
    </div>
  );
}

export default App;
