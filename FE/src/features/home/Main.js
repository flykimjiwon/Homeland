/* eslint-disable */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import "./Main.css";
import UserVideoComponent from "./UserVideoComponent";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MainAccordion from "./MainAccordion.js";
import "aos/dist/aos.css";
import backendUrl from "../setup/hld_url";
import Home from "./Home";

const OPENVIDU_SERVER_URL = "https://i6c202.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "HOMELAND";
const BEUrl = backendUrl;

class Main extends Component {
  render() {
    return (
      <>
        <Home></Home>
      </>
    );
  }
}

export default Main;
