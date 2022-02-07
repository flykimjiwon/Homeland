/* eslint-disable */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState, Component, createRef } from "react";
import "./MeetingMain.css";
import UserVideoComponent from "./UserVideoComponent";
import backendUrl from "../setup/hld_url";
import Messages from "../chat/Messages";
import {
  IoMicSharp,
  IoMicOffSharp,
  IoVideocamOff,
  IoVideocam,
  IoImages,
} from "react-icons/io5";

import html2canvas from "html2canvas";
import Modal from "./Modal";
import CountDown from "./CountDown";

import { IoMdExpand, IoMdContract } from "react-icons/io";

import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";

const OPENVIDU_SERVER_URL = "https://i6c202.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "HOMELAND";
const BEUrl = backendUrl;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionData: [],
      mySessionId: "",
      myUserName: "",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      messages: [],
      message: "",
      audiostate: false,
      screenstate: false,
      captured: "",
      modalOpen: false,
      cnt: false,
      userId: "",
      connectionId: "",
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    // chat
    this.chattoggle = this.chattoggle.bind(this);
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: "messages__item--operator",
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: "chat",
    });

    this.setState({
      message: "",
    });
  }

  sendmessageByEnter(e) {
    if (e.key === "Enter") {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: "messages__item--operator",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: "chat",
      });

      this.setState({
        message: "",
      });
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

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
          userId: res.data.id,
        });
      });
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
        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: "messages__item--visitor",
                },
              ],
            });
          }
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
      myUserName: this.myUserName,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const messages = this.state.messages;
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const userId = this.state.userId;
    const connectionId = this.state.connectionId;
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

    const sendUserData = () => {
      axios({
        url: `${BEUrl}/api/v1/room/${this.state.mySessionId}`,
        method: "put",
        data: {
          userId: this.state.userId,
          nickName: myUserName,
          connectionId: this.state.connectionId,
        },
      }).then((res) => {
        console.log(res);
      });
    };

    const onCreateRoom = (event) => {
      event.preventDefault();
      axios({
        url: `${BEUrl}/api/v1/room/create`,
        method: "get",
      })
        .then((res) => {
          this.setState({
            mySessionId: res.data,
          });
        })
        .then(() => {
          this.joinSession();
        })
        .then(() => {
          sendUserData();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const { mypage } = this.props;
    return (
      <div className="container" className="bg-test">
        {this.state.session === undefined ? (
          <Container>
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
                    {loginToken ? (
                      <form className="form-group">
                        <br></br>
                        <h4>닉네임: {myUserName}</h4>
                        <h4 className="font-big-orange">
                          {" "}
                          방번호를 입력해주세요.{" "}
                        </h4>
                        <InputGroup>
                          <FormControl
                            className="grey"
                            type="text"
                            id="sessionId"
                            value={mySessionId}
                            onChange={this.handleChangeSessionId}
                            placeholder="방 번호"
                            required
                          />

                          <input
                            type="submit"
                            value="JOIN"
                            className="btn btn-lg btn-warning"
                            onClick={this.joinSession}
                          />
                        </InputGroup>

                        <div className="d-flex justify-content-center">
                          <p className="text-center me-2">
                            <br></br>
                            <input
                              className="btn btn-lg btn-warning"
                              name="commit"
                              type="submit"
                              value="방 만들기"
                              onClick={onCreateRoom}
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
            <div>
              {this.state.audiostate ? (
                // mic, video of/off
                <IoMicSharp
                  color="#9FA9D8"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                />
              ) : (
                <IoMicOffSharp
                  color="#50468c"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                />
              )}
              {this.state.videostate ? (
                <IoVideocam
                  color="#9FA9D8"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                />
              ) : (
                <IoVideocamOff
                  color="#50468c"
                  size="24"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                />
              )}
              {this.state.screenstate ? (
                <IoMdExpand
                  color="#9FA9D8"
                  size="24"
                  onClick={() => {
                    this.openFullScreenMode();
                    this.setState({ screenstate: !this.state.screenstate });
                  }}
                />
              ) : (
                <IoMdContract
                  color="#50468c"
                  size="24"
                  onClick={() => {
                    this.closeFullScreenMode();
                    this.setState({ screenstate: !this.state.screenstate });
                  }}
                />
              )}
              <IoImages
                color="#50468c"
                size="24"
                onClick={() => {
                  this.onCapture();
                }}
              />
              )}
            </div>
            <div id="CntDown"></div>
            {this.state.cnt ? <CountDown /> : <span></span>}

            <Container>
              <Row>
                <Col md={{ span: 10 }}>
                  {this.state.mainStreamManager !== undefined ? (
                    <div id="main-video" className="col-md-6">
                      <UserVideoComponent
                        streamManager={this.state.mainStreamManager}
                      />
                    </div>
                  ) : null}
                  <div id="video-container" className="video-container">
                    {this.state.publisher !== undefined ? (
                      <div
                        className="stream-container"
                        onClick={() =>
                          this.handleMainVi - deoStream(this.state.publisher)
                        }
                      >
                        <UserVideoComponent
                          streamManager={this.state.publisher}
                        />
                      </div>
                    ) : null}
                    {this.state.subscribers.map((sub, i) => (
                      <div
                        key={i}
                        className="stream-container"
                        onClick={() => this.handleMainVideoStream(sub)}
                      >
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col md={{ span: 2 }}>
                  {/* chat */}
                  <div className="chatbox">
                    <div className="chat chatbox__support chatbox--active">
                      <div className="chat chatbox__header">{mySessionId}</div>
                      <div className="chatbox__messages">
                        {/* {this.displayElements} */}
                        <Messages messages={messages} />
                        <div />
                      </div>
                      <div className="chat chatbox__footer">
                        <input
                          id="chat_message"
                          type="text"
                          placeholder="Write a message..."
                          onChange={this.handleChatMessageChange}
                          onKeyPress={this.sendmessageByEnter}
                          value={this.state.message}
                        />
                        <p
                          className="chat chatbox__send--footer"
                          onClick={this.sendmessageByClick}
                        >
                          Send
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ) : null}

        {/* 스크린샷 모달창 */}
        <Modal open={this.state.modalOpen} close={this.closeModal}>
          <div id="preview"></div>
          저장하시겠습니까?
          <button
            className="close"
            onClick={() =>
              this.onSaveAs(
                this.state.captured.toDataURL("image/png"),
                "HomeLanDrink.png"
              )
            }
          >
            네
          </button>
          <button className="close" onClick={this.closeModal}>
            {" "}
            아니오
          </button>
        </Modal>
      </div>
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
          this.setState({
            connectionId: response.data.connectionId,
          });
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
  // 전체화면 설정
  openFullScreenMode() {
    console.log("fullscreen");
    if (document.documentElement.requestFullscreen)
      document.documentElement.requestFullscreen();
    else if (document.webkitRequestFullscreen)
      // Chrome, Safari (webkit)
      document.documentElement.webkitRequestFullscreen();
    else if (document.mozRequestFullScreen)
      // Firefox
      document.documentElement.mozRequestFullScreen();
    else if (document.msRequestFullscreen)
      // IE or Edge
      document.documentElement.msRequestFullscreen();
  }
  // 전체화면 해제
  closeFullScreenMode() {
    console.log("closefullscreen");
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen)
      // Chrome, Safari (webkit)
      document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)
      // Firefox
      document.mozCancelFullScreen();
    else if (document.msExitFullscreen)
      // IE or Edge
      document.msExitFullscreen();
  }
  onCapture() {
    console.log("onCapture");
    this.setState({ cnt: true });
    setTimeout(() => {
      this.setState({ cnt: false });
      html2canvas(document.getElementById("session")).then((canvas) => {
        this.state.captured = canvas;
        this.openModal();
        document.getElementById("preview").appendChild(canvas);
      });
    }, 6000);
  }

  onSaveAs(uri, filename) {
    console.log("onSaveAs");
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      this.closeModal();
    }, 500);
  }
}

export default Main;
