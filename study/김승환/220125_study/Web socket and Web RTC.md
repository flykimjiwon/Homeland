## NodeJS 개발환경 구축



### 1. nodemon.json

##### Nodemon을 설정하기 위해 nodemon.json 파일 생성

Nodemon : 프로젝트에 변경 사항이 있을 시 서버를 재시작해주는 프로그램

```json
{
  "ignore": ["src/public/*"],
  "exec": "babel-node src/server.js"
}
```

* Babel-node
  * 서버를 재시작하는 대신 우리가 작성한 코드를 일반 NodeJS코드로 컴파일
  * 위 작업을 src/server.js 파일에 해줌

### 2. server.js

```js
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/ ", (req,res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
```

* express를 import하고, 
  express 어플리케이션을 구성하고,
  view engine을 pug로 설정하고, 
  views 디렉토리를 설정하고,





### ws: a Node.js WebSocket library

npm i ws

![image-20220125163217505](Web socket and Web RTC.assets/image-20220125163217505.png)

```js
function handleConnection(socket) {
  console.log(socket);
}

wss.on("connection", handleConnection)

```

connection : 연결됐을 때!