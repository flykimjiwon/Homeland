/* eslint-disable */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import "./Main.css";
import UserVideoComponent from "./UserVideoComponent";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "aos/dist/aos.css";
import backendUrl from "../setup/hld_url";
import Home from "./Home";

const OPENVIDU_SERVER_URL = "https://i6c202.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "HOMELAND";
const BEUrl = backendUrl;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "",
      myUserName: "",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      axios({
        url: `${BEUrl}/api/v1/users/me`,
        method: "get",
        headers: config,
      }).then((res) => {
        this.setState({
          myUserName: res.data.nickname,
        });
      });
      const onIsLogin = this.props.onIsLogin;
      onIsLogin(true);
    }
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "",
      myUserName: "",
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const loginToken = localStorage.getItem("jwt");

    const onCheckSession = (event) => {
      event.preventDefault();
      axios({
        url: `${BEUrl}/api/v1/room/${mySessionId}`,
        method: "get",
        data: {
          roomId: mySessionId,
        },
      })
        .then(() => {
          this.joinSession();
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("방이 존재하지 않습니다.");
          }
        });
    };

    return (
      <>
        <div className="container">
          {this.state.session === undefined ? (
            <Container>
              <Row></Row>
              <Row>
                <Col></Col>
                <Col xs={4}>
                  <div id="join">
                    <div id="img-div">
                      <img
                        src="/openvidu_grey_bg_transp_cropped.png"
                        alt="OpenVidu logo"
                      />
                    </div>
                    <div id="join-dialog" className="jumbotron vertical-center">
                      <h1> Weclome to </h1>
                      <h1> Home Lan Drink! </h1>
                      <br></br>
                      {/* form에 onSubmit={this.joinSession} */}
                      {loginToken ? (
                        <form className="form-group">
                          <br></br>
                          <h4 className="font-big-orange">
                            {" "}
                            방번호를 입력해주세요.{" "}
                          </h4>
                          <input
                            className="form-control grey"
                            type="text"
                            id="sessionId"
                            value={mySessionId}
                            onChange={this.handleChangeSessionId}
                            placeholder="방 번호"
                            required
                          />
                          <div className="d-flex justify-content-center">
                            <p className="text-center me-2">
                              <br></br>
                              <input
                                className="btn btn-lg btn-warning"
                                name="commit"
                                type="submit"
                                value="방 만들기"
                                onClick={onCheckSession}
                              />
                            </p>
                            <p className="text-center ms-2">
                              <br />
                              <input
                                type="submit"
                                value="JOIN"
                                className="btn btn-lg btn-warning"
                                onClick={this.joinSession}
                              />
                            </p>
                          </div>
                        </form>
                      ) : (
                        <form className="form-group">
                          <h4 className="font-big-orange">
                            닉네임을 입력해주세요.{" "}
                          </h4>
                          <input
                            className="form-control grey"
                            type="text"
                            id="userName"
                            value={myUserName}
                            onChange={this.handleChangeUserName}
                            placeholder="닉네임"
                            required
                          />
                          <br></br>
                          <h4 className="font-big-orange">
                            {" "}
                            방번호를 입력해주세요.{" "}
                          </h4>
                          <input
                            className="form-control grey"
                            type="text"
                            id="sessionId"
                            value={mySessionId}
                            onChange={this.handleChangeSessionId}
                            placeholder="방 번호"
                            required
                          />
                          <p className="text-center">
                            <br></br>
                            <input
                              className="btn btn-lg btn-warning"
                              name="commit"
                              type="submit"
                              value="JOIN"
                              onClick={onCheckSession}
                            />
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </Col>
                <Col></Col>
              </Row>
              <br></br>
              <br></br>
            </Container>
          ) : null}

          {this.state.session !== undefined ? (
            <div id="session">
              <div id="session-header">
                <h1 id="session-title">{mySessionId}</h1>
                <input
                  className="btn btn-large btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
                  value="Leave session"
                />
              </div>

              {this.state.mainStreamManager !== undefined ? (
                <div id="main-video" className="col-md-6">
                  <UserVideoComponent
                    streamManager={this.state.mainStreamManager}
                  />
                </div>
              ) : null}
              <div id="video-container" className="col-md-6">
                {this.state.publisher !== undefined ? (
                  <div
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() =>
                      this.handleMainVi - deoStream(this.state.publisher)
                    }
                  >
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                ) : null}
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default Main;
