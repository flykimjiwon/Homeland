import { useState, useEffect, useRef } from "react";
import "./GamePanel.css";
import CountDown from "./CountDown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col } from "react-bootstrap";
import { IoReturnUpBack } from "react-icons/io5";

const MySwal = withReactContent(Swal);

function GamePanel(props) {
  let [gameCategory, selectCategory] = useState(props.gameCategory);
  let [display, Setdisplay] = useState(props.gamePanel);
  let [sessionData, SetsessionData] = useState(props.sessionData);
  let [mySessionId, SetmySessionId] = useState(props.mySessionId);
  let [myUserName, SetmyUserName] = useState(props.myUserName);
  let [session, Setsession] = useState(props.session);
  let [publisher, Setpublisher] = useState(props.publisher);
  let [subscribers, Setsubscribers] = useState(props.subscribers);
  let [connectionId, SetconnectionId] = useState(props.connectionId);
  let [connections, Setconnections] = useState(props.connections);
  let [connectionUser, SetconnectionUser] = useState(props.connectionUser);

  const prevGameCategoryRef = useRef("main");
  const prevGameCategory = prevGameCategoryRef.current;
  // useEffect(() => {
  //   prevGameCategoryRef.current = gameCategory;
  // });

  useEffect(() => {
    receiveSignal();
  }, []);

  useEffect(() => {
    if (props.cnt) {
      selectCategory("countDown");
      prevGameCategoryRef.current = gameCategory;
    } else {
      selectCategory(prevGameCategory);
      prevGameCategoryRef.current = gameCategory;
    }
  }, [props.cnt]);

  useEffect(() => {
    props.gamePanel ? Setdisplay(true) : Setdisplay(false);
  }, [props.gamePanel]);

  useEffect(() => {
    selectCategory(props.gameCategory);
  }, [props.gameCategory]);

  useEffect(() => {
    SetsessionData(props.sessionData);
  }, [props.sessionData]);

  useEffect(() => {
    SetmySessionId(props.mySessionId);
  }, [props.mySessionId]);

  useEffect(() => {
    SetmyUserName(props.myUserName);
  }, [props.myUserName]);

  useEffect(() => {
    Setsession(props.session);
  }, [props.session]);

  useEffect(() => {
    Setpublisher(props.publisher);
  }, [props.publisher]);

  useEffect(() => {
    Setsubscribers(props.subscribers);
  }, [props.subscribers]);

  useEffect(() => {
    SetconnectionId(props.connectionId);
  }, [props.connectionId]);

  useEffect(() => {
    Setconnections(props.connections);
  }, [props.connections]);

  //LiarGame Start
  let [liarOrNot, SetLiarOrNot] = useState("");
  let [liar, SetLiar] = useState([]);
  let [liarSubject, SetLiarSubject] = useState("");
  //LiarGame End

  //UpAndDown Start
  let [gameState, SetGameState] = useState(false);
  let [range, SetRange] = useState(10);
  let [randomNum, SetRandomNum] = useState(5);
  let [upAndDownNum, SetUpAndDownNum] = useState(0);
  let [matchingUpDown, SetMatchingUpDown] = useState("");

  const onChangeRange = (e) => {
    e.preventDefault();
    SetRange(e.target.value);
  };
  const onChangeUpAndDownNum = (e) => {
    e.preventDefault();
    SetUpAndDownNum(e.target.value);
  };
  useEffect(() => {
    SetGameState(gameState);
  }, [gameState]);
  //UpAndDown End

  return (
    <div className={display ? "panel" : "nondisplay"}>
      {/* <div className="present">
        {gameState} 11111 {range} 1111 {randomNum}
      </div> */}
      <div className="game-header">game panel </div>
      {
        {
          main: (
            <div>
              <div className="title">
                <h>어떤 술게임을 해볼까요?</h>
              </div>
              <div className="games">
                <div
                  onClick={() => {
                    selectCategory("liarGame");
                    props.setGameCategory("liarGame");
                  }}
                >
                  라이어 게임
                </div>
                <div
                  onClick={() => {
                    selectCategory("upAndDown");
                    props.setGameCategory("upAndDown");
                  }}
                >
                  UP & DOWN
                </div>
                <div
                  onClick={() => {
                    selectCategory("baskinrobbins31");
                    props.setGameCategory("baskinrobbins31");
                  }}
                >
                  베스킨 라빈스 31
                </div>
              </div>
            </div>
          ),
          countDown: (
            <div className="countDown">
              <p>스냅샷 카운트 다운!</p>
              <CountDown></CountDown>
            </div>
          ),
          liarGame: (
            <div>
              <div className="back btn-font">
                <IoReturnUpBack
                  size={24}
                  onClick={() => {
                    selectCategory("main");
                    props.setGameCategory("main");
                  }}
                />
                <p>뒤로가기</p>
              </div>
              {/* <input
                className="btn game-btn"
                name="commit"
                type="submit"
                value="라이어게임 시작"
                onClick={() => {
                  startLiarGame();
                }}
              /> */}
              <br></br>
              <br></br>
              <h4 className="liar-title">제시어 카테고리를 선택해주세요!</h4>
              <p>{liarOrNot}</p>
              <Container className="liab-box">
                <Row className="liar-subject-box" style={{ paddingTop: 10 }}>
                  <Col
                    md={{ span: 4 }}
                    className="box-red"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Animal");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    동물
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-blue"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Country");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    국가
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-red"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Fruit");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    과일
                  </Col>
                </Row>
                <Row className="liar-subject-box">
                  <Col
                    md={{ span: 4 }}
                    className="box-blue"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Sports");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    스포츠
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-red"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Job");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    직업
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-blue"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Idol");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    아이돌
                  </Col>
                </Row>
                <Row className="liar-subject-box">
                  <Col
                    md={{ span: 4 }}
                    className="box-red"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Movie");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    영화
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-blue"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Actor");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    한국배우
                  </Col>
                  <Col
                    md={{ span: 4 }}
                    className="box-red"
                    // onClick={() => {
                    //   if (!isHost) {
                    //     return;
                    //   } else {
                    //     selectSubjectCategory("Place");
                    //     signalSetLiarGameState("discussion");
                    //   }
                    // }}
                  >
                    장소
                  </Col>
                </Row>
              </Container>
            </div>
          ),
          upAndDown: (
            <div>
              <p>UP & DOWN 시작!</p>
              <p
                onClick={() => {
                  selectCategory("main");
                  props.setGameCategory("main");
                  SetMatchingUpDown("");
                  SetGameState(false);
                }}
              >
                게임 선택 돌아가기
              </p>
              <div className="UpAndDown">
                {!gameState ? (
                  <div>
                    <div>범위를 지정해주세요!</div>
                    <div>
                      0부터 몇사이 숫자로?? &#40;9&#60;N&#60;100000&#41;
                    </div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        max="100000"
                        onChange={onChangeRange}
                        value={range}
                      />
                    </div>
                    <div
                      onClick={() => {
                        sendRange();
                      }}
                    >
                      범위 정하기
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>{randomNum}</div>
                    <div>
                      <input
                        type="number"
                        onChange={onChangeUpAndDownNum}
                        value={upAndDownNum}
                      />
                    </div>
                    <div>{matchingUpDown}</div>
                    <div
                      onClick={() => {
                        sendUpAndDownNum();
                      }}
                    >
                      숫자 제시하기
                    </div>
                    <div
                      onClick={() => {
                        // SetGameState(false);
                        sendRestart();
                      }}
                    >
                      Up & Down Game 다시 시작하기!
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
          baskinrobbins31: (
            <div>
              <p>베스킨라빈스31 시작!</p>
              <p
                onClick={() => {
                  selectCategory("main");
                  props.setGameCategory("main");
                }}
              >
                게임 선택 돌아가기
              </p>
            </div>
          ),
        }[gameCategory]
      }
    </div>
  );

  function sendLiarOrNot() {
    const mySession = session;
    console.log("커넥션즈", connections);
    let liarUser = connections.filter(
      (element) => element.connectionId === liar.userId
    );
    console.log("커넥션즈####", liar.userId, liarUser);
    mySession.signal({
      data: "당신은 라이어 입니다.",
      to: liarUser,
      type: "pickLiar",
    });

    let notLiarUser = connections.filter(
      (element) => element.connectionId !== liar.userId
    );
    console.log("커넥션즈####", liar.userId, notLiarUser);
    mySession.signal({
      data: "제시어는 " + liarSubject + " 입니다.",
      to: notLiarUser,
      type: "liarSubject",
    });
  }

  function sendRestart() {
    setTimeout(() => {
      SetGameState(() => false);
      SetMatchingUpDown(() => "");
      createRandomNumber(range);
    }, 300);
    const mySession = session;
    // let liarUser = this.state.connections.filter((element) => element.connectionId == this.state.liar.userId);
    mySession.signal({
      data: `${gameState}`,
      to: [],
      type: "setRestart",
    });
  }

  function sendRange() {
    setTimeout(() => {
      SetGameState(() => true);
      createRandomNumber(range);
    }, 300);
    const mySession = session;
    // let liarUser = this.state.connections.filter((element) => element.connectionId == this.state.liar.userId);
    mySession.signal({
      data: `${gameState},${range},${randomNum}`,
      to: [],
      type: "setRange",
    });
  }

  function sendUpAndDownNum() {
    setTimeout(() => {
      matchUpDown(upAndDownNum);
    }, 300);
    const mySession = session;

    mySession.signal({
      data: `${upAndDownNum},${matchingUpDown}`,
      to: [],
      type: "setUpAndDownNum",
    });
  }

  function receiveSignal() {
    const mySession = session;

    mySession.on("signal:pickLiar", (event) => {
      event.preventDefault();
      setTimeout(() => {
        SetLiarOrNot(() => event.data);
      }, 200);
      MySwal.fire("당신은 라이어 입니다");
    });

    mySession.on("signal:liarSubject", (event) => {
      setTimeout(() => {
        console.log("제시어1111", liarSubject);
        SetLiarOrNot(() => event.data);
        console.log("제시어2222", liarSubject);
      }, 200);
      MySwal.fire(`제시어는 ${liarSubject} 입니다`);
      console.log("제시어33333", liarSubject);
    });

    mySession.on("signal:setRange", (event) => {
      event.preventDefault();
      let Data = event.data.split(",");
      console.log("랜덤넘@@@@", Data);
      console.log("랜덤넘1111", gameState, range, randomNum);
      SetGameState(() => false);
      SetRange(() => 123);
      SetRandomNum(() => 55);
      console.log("랜덤넘222", gameState, range, randomNum);
      console.log("랜덤넘3333", gameState, range, randomNum);
    });

    mySession.on("signal:setUpAndDownNum", (event) => {
      event.preventDefault();
      let Data = event.data.split(",");
      console.log("셋업", Data);
      SetUpAndDownNum(Data[0]);
      SetMatchingUpDown(Data[1]);
    });

    mySession.on("signal:setRestart", (event) => {
      event.preventDefault();
      SetGameState(() => event.data);
    });
  }

  //LiarGame Start
  function startLiarGame() {
    setTimeout(() => {
      let liar = shuffleArray(connectionUser)[0];
      SetLiar(() => liar);
    }, 200);
    // await this.setState({
    //   liar: liar,
    // });
    console.log("제시어0000000", liarSubject);
    let Food = ["양파링", "사과", "딸기", "라면", "오렌지", "돼지고기"];
    let subject = shuffleArray(Food)[0];
    setTimeout(() => {
      SetLiarSubject(() => subject);
    }, 200);
    console.log("제시어*******", liarSubject);
    // await this.setState({
    //   liarSubject: subject,
    // });
    sendLiarOrNot();
  }
  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (parseInt(i) + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  //LiarGame End

  //UpAndDown Start
  function createRandomNumber(num) {
    const randomNum = Math.floor(Math.random() * (parseInt(num) + 1));
    SetRandomNum(() => randomNum);
  }
  function matchUpDown(chooseNum) {
    if (chooseNum < randomNum) {
      SetMatchingUpDown(() => "UP");
    } else if (chooseNum > randomNum) {
      SetMatchingUpDown(() => "DOWN");
    } else {
      SetMatchingUpDown(() => "맞췄습니다!");
    }
  }
  //UpAndDown End
}

export default GamePanel;
