## SocketIO

* SocketIO는 websocket를 실행하는 것이 아님
  websocket은 socketIO가 양방향, event기반 통신을 제공하는 방법 중 하나
  많은 방법 중 하나일 뿐!
  예를 들어 특정 브라우저나 모바일이 websocket을 지원하지 않더라도
  socketIO는 계속 작동함
  즉 socketIO는 websocket의 부가기능이 아니라 
  socketIO가 가끔 websocket을 이용하는 것 뿐!!!



#### npm i socekt.io





* server.js

  ```js
  import { Server } from "socket.io";
  
  const httpServer = http.createServer(app);
  const wsServer = new Server(httpServer);
  
  
  wsServer.on("connection", (socket) => {
    console.log(socket);
  });
  ~~~~
      
  가장하단에
  const handleListen = () => console.log(`Listening on http://localhost:3000`);
  httpServer.listen(3000, handleListen);
  ```
  
  

* app.js

  ```js
  const socket = io();
  
  가장 하단에
  script(src="/socket.io/socket.io.js")
  ```

  web socket api는 브라우저에 default로 모두 설치가 되있었지만
  socket.io는 설치해주어야 함.
  위 코드가 socketIO를 설치해주는 코드 역할!





#### socketIO 장점

1. event명을 내맘대로 정할 수 있음 (enter_room 대신 bye, babo 등 맘대로!! 대신 server, app 통일만 )

2. stringify 없이 객체 자체를 보낼 수 있음

   * app.js

     ```js
     function handleRoomsubmit(event) {
       event.preventDefault();
       const input = form.querySelector("input");
       socket.emit("enter_room", { payload: input.value });
       input.value = "";
     }
     ```

   * server.js

     ```js
     wsServer.on("connection", (socket) => {
       socket.on("enter_room", (msg) => console.log(msg));
     });
     ```

     emit의 argument

     1. event명
     2. JSON object를 보냄 (server에서 msg로 받는 부분)

* socketIO를 사용하면 모든 것이 message일 필요가 없음!
  * websocket에서는 string으로만 되어있는 message만 보낼 수 있었음
  * 첫째 인자로 우리가 원하는 어떤 이벤트든 다 emit할 수 있음
  * 두번째 인자로 우리가 원하는 아무거나 다 전송 text, number, object 등등
  * 또한 하나만 보내는 것이 아니라 여러개를 다 보낼 수 있음
    대신 emit의 인자수 = on의 인자수로 맞춰주어야함
* emit의 마지막 인자 = front에 있는 function을 backend가 실행시킴!!!!!!!!!!!!

