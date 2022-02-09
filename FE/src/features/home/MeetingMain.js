/* eslint-disable */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState, Component, createRef } from "react";
import "./MeetingMain.css";
import UserVideoComponent from "./UserVideoComponent";
import Messages from "../chat/Messages";
import {
  IoMicSharp,
  IoMicOffSharp,
  IoVideocamOff,
  IoVideocam,
  IoCameraSharp,
  IoExit,
} from "react-icons/io5";
import html2canvas from "html2canvas";
import Modal from "./Modal";
import CountDown from "./CountDown";

import { IoMdExpand, IoMdContract } from "react-icons/io";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Carousel,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";
const btn_size = "36";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      messages: [],
      message: "",
      audiostate: true,
      screenstate: true,
      videostate: true,
      captured: "",
      modalOpen_capture: false,
      modalOpen_leave: false,
      cnt: false,
      previewOpen: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.clickLeave = this.clickLeave.bind(this);
    // chat
    this.chattoggle = this.chattoggle.bind(this);
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
  }

  escFunction(event) {
    if ((event.key === 27) | (event.which === 27)) {
      this.closeModalCapture();
      this.closeModalLeave();
      //Do whatever when esc is pressed
    }
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }
  // 채팅 자동 하단 스크롤
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }

  sendmessageByClick() {
    if (this.state.message !== "") {
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
    }

    this.setState({
      message: "",
    });
  }

  sendmessageByEnter(e) {
    if (e.key === "Enter") {
      if (this.state.message !== "") {
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
  }

  openModalCapture = () => {
    this.setState({ modalOpen_capture: true });
  };

  closeModalCapture = () => {
    this.setState({ modalOpen_capture: false });
    this.setState({ previewOpen: false });
  };

  openModalLeave = () => {
    this.setState({ modalOpen_leave: true });
  };

  closeModalLeave = () => {
    this.setState({ modalOpen_leave: false });
  };

  clickLeave = () => {
    this.closeModalLeave();
    this.leaveSession();
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    document.removeEventListener("keydown", this.escFunction, false);
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
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const messages = this.state.messages;
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
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
                    <img src="/HLD_logo_310x310.png" alt="OpenVidu logo" />
                  </div>
                  <div id="join-dialog" className="jumbotron vertical-center">
                    <h1> Weclome to </h1>
                    <h1> Home Lan Drink! </h1>
                    <br></br>
                    <form className="form-group" onSubmit={this.joinSession}>
                      <h4 className="font-big-orange">
                        닉네임을 입력해주세요.{" "}
                      </h4>
                      <input
                        className="form-control grey"
                        type="text"
                        id="userName"
                        value={myUserName}
                        onChange={this.handleChangeUserName}
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
                        required
                      />
                      <p className="text-center">
                        <br></br>
                        <input
                          className="btn btn-lg btn-warning"
                          name="commit"
                          type="submit"
                          value="JOIN"
                        />
                      </p>
                    </form>
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
          <div id="session" className="height-100">
            <Container className="height-100">
              <div id="img-div">
                <img
                  src="/HLD_logo_150x150.png"
                  alt="OpenVidu logo"
                  sizes="24"
                />
              </div>
              <Row className="height-calc">
                <Col md={{ span: 9 }} id="capture_screen">
                  {/* screens */}
                  <div id="video-container" className="video-container">
                    {this.state.publisher !== undefined ? (
                      <div className="stream-container">
                        <UserVideoComponent
                          streamManager={this.state.publisher}
                        />
                      </div>
                    ) : null}
                    {this.state.subscribers.map((sub, i) => (
                      <div key={i} className="stream-container">
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    ))}
                  </div>

                  {/* buttons */}
                  <div className="btn_toolbar">
                    {this.state.audiostate ? (
                      <IoMicSharp
                        color="#50468c"
                        size={btn_size}
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate
                          );
                          this.setState({ audiostate: !this.state.audiostate });
                        }}
                      />
                    ) : (
                      <IoMicOffSharp
                        color="#9FA9D8"
                        size={btn_size}
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate
                          );
                          this.setState({ audiostate: !this.state.audiostate });
                        }}
                      />
                    )}
                    {this.state.videostate ? (
                      <IoVideocam
                        color="#50468c"
                        size={btn_size}
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate
                          );
                          this.setState({ videostate: !this.state.videostate });
                        }}
                      />
                    ) : (
                      <IoVideocamOff
                        color="#9FA9D8"
                        size={btn_size}
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate
                          );
                          this.setState({ videostate: !this.state.videostate });
                        }}
                      />
                    )}
                    {this.state.screenstate ? (
                      <IoMdExpand
                        color="#50468c"
                        size={btn_size}
                        onClick={() => {
                          this.openFullScreenMode();
                          this.setState({
                            screenstate: !this.state.screenstate,
                          });
                        }}
                      />
                    ) : (
                      <IoMdContract
                        color="#9FA9D8"
                        size={btn_size}
                        onClick={() => {
                          this.closeFullScreenMode();
                          this.setState({
                            screenstate: !this.state.screenstate,
                          });
                        }}
                      />
                    )}
                    <IoCameraSharp
                      color="#50468c"
                      size={btn_size}
                      onClick={() => {
                        this.onCapture();
                      }}
                    />
                    <IoExit
                      color="#50468c"
                      size={btn_size}
                      onClick={this.openModalLeave}
                    />
                  </div>
                </Col>

                <Col md={{ span: 3 }}>
                  {/* chat */}
                  <div className="height-80">
                    <div className="chatbox__support">
                      <div className="chatbox__header">{mySessionId}</div>
                      <div className="chatbox__messages" ref="chatoutput">
                        {/* {this.displayElements} */}
                        <Messages messages={messages} />
                        <div />
                      </div>
                      <div className="chatbox__footer">
                        <input
                          id="chat_message"
                          type="text"
                          placeholder="Write a message..."
                          onChange={this.handleChatMessageChange}
                          onKeyPress={this.sendmessageByEnter}
                          value={this.state.message}
                        />
                        <button
                          className="chatbox__send--footer"
                          onClick={this.sendmessageByClick}
                        >
                          Enter
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

            <div id="CntDown"></div>
            {this.state.cnt ? <CountDown /> : <span></span>}
          </div>
        ) : null}

        {/* 스크린샷 모달창 */}
        <Modal
          open={this.state.modalOpen_capture}
          close={this.closeModalCapture}
        >
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
          <button className="close" onClick={this.closeModalCapture}>
            {" "}
            아니오
          </button>
        </Modal>

        {/* 종료창 모달창 */}
        <Modal open={this.state.modalOpen_leave} close={this.closeModalLeave}>
          종료하시겠습니까?
          <button className="close" onClick={this.clickLeave}>
            네
          </button>
          <button className="close" onClick={this.closeModalLeave}>
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
    if (!this.state.previewOpen) {
      this.setState({ cnt: true, previewOpen: true });
      setTimeout(() => {
        {
          this.setState({ cnt: false });
          html2canvas(document.getElementById("capture_screen")).then(
            (canvas) => {
              this.state.captured = canvas;
              this.openModalCapture();
              document.getElementById("preview").appendChild(canvas);
            }
          );
        }
      }, 6000);
    }
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
      this.closeModalCapture();
    }, 500);
  }
}

export default Main;
