# WebRTC ZOOM클론코딩 #1

세팅



```
mkdir zoom
cd zoom
npm init -y
```

### npm?

Node Package Manager의 약자, nodejs의 모듈 관리하기 위해사용



### package.json

npm을 통해 설치된 패키지 목록을 관리하고 프로젝트의 정보, 여러 실행 스크립트를 작성

npm은 node설치시 자동으로 설치됨



```
$ npm init -y
Wrote to C:\Users\kimjiwon\Documents\zoom\package.json:

{
  "name": "zoom",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

npm init -y는, npm init만해도 package.json을 만들 수 있는데 양식을 원래 정해줘야하지만 -y하나만 하면

default값으로 정해줘서 위와같이 만들어준다. -y는 yes의 의미라고한다.

https://www.dailysmarty.com/posts/npm-init-y-explanation



code . 으로 실행해주고



```
{
  "name": "zoom",
  "version": "1.0.0",
  "description": "Zoom Clone using WebRTC and Websockets",
  "license": "MIT"
}

```

package.json에서 script와 main을 삭제해준다.



---

```
npm i nodemon -D
```

-D => development

노드몬이란?(nodemon)

node서버를 이용하면서 코드를 변경하게 될 경우 변경한 코드를 웹 상에서 확인하려면

서버를 껏다 켜야하는데 이러지않고도 자동으로 감지해서 서버를 재시작하게 해주는 도구



![image-20220125105555319](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125105555319.png)

그리고 이와같이

babel을 사용하기위헤

`babel.config.json`을 설치하고 `nodemon.json`, `src`폴더를만들고 그안에 `server.js`까지만들어준다



---

이제 Babel을 설치해주기

`git init .`

`npm i @babel/core @babel/cli @babel/node -D`

`touch .gitignore` => 그냥 .gitignore파일을 만들어줘도됨



```
'.gitignore'
/node_modules
```

node를 깃에 올리지 않기위함



다음은 nodemon.json

```
{
  "exec":"babel-node src/server.js"
}

```

server.js하나만 실행하기위한 exec명령어



babel.config.json

`npm i @babel/preset-env -D`설치후

```
{
  "presets": ["@babel/preset-env"]
}
```



---

이러고나면

package.json에 이와같이 나온다.

```
{
  "name": "zoom",
  "version": "1.0.0",
  "description": "Zoom Clone using WebRTC and Websockets",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.16.8",
    "@babel/core": "^7.16.12",
    "@babel/node": "^7.16.8",
    "@babel/preset-env": "^7.16.11",
    "nodemon": "^2.0.15"
  }
}

```

그리고

nodemon.json에는

```
{
  "exec":"babel-node src/server.js"
}

```

하나의 exec라는 key가있는데 src/server.js에대해 babel-node명령문을 실행시킨다.



babel.config.json에는

```
{
  "presets": ["@babel/preset-env"]
}
```

사용할 유일한 preset이 입력되어있다.



다시 package.json에서

```
{
  "name": "zoom",
  "version": "1.0.0",
  "description": "Zoom Clone using WebRTC and Websockets",
  "license": "MIT",
  "scripts":{
    "dev":"nodemon"
  },
  "devDependencies": {
    "@babel/cli": "^7.16.8",
    "@babel/core": "^7.16.12",
    "@babel/node": "^7.16.8",
    "@babel/preset-env": "^7.16.11",
    "nodemon": "^2.0.15"
  }
}

```

scripts를 위와같이 추가, dev는 nodemon을 호출 그러면 nodemon이 nodemon.json을 살펴보고

해당 코드를 실행

```
{
  "exec":"babel-node src/server.js"
}

```



---

`npm i express`

`npm i pug`



그리고 server.js로가서

```javascript
import express from "express"

const app = express()

console.log("hello")

app.listen(3000)
```

app은 console을 실행하고 포트 3000을 listen해준다.



`npm run dev`



근데 나는 이와같은 오류가 났음

![image-20220125111252414](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125111252414.png)

`'babel-node'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.`

검색해보니 해결방법은

`npm i @babel/node -g`

babel/node를 글로벌 옵션으로 설치하면 해결된다고함

![image-20220125111328675](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125111328675.png)

이와같이 제대로 동작하는 모습이다



참고로 나는 package.json에



```
"dependencies": {
    "express": "^4.17.2",
    "pug": "^3.0.2"
  }
```

얘네둘도 제대로 설치가 안됬었다. 왜그랬을까? 여튼! 해보자.



이렇게 한번 세팅해두는거 기록하고 저장하면



그 이후로는 npm i 하나만으로 그대로 환경을 가져올 수 있다.





---

# WebRTC ZOOM클론코딩 #2

![image-20220125121617714](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125121617714.png)

src/public/js/app.js 만들어주기

![image-20220125131915350](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125131915350.png)

src/views/home.pug 만들어주기



```javascript
server.js

import express from "express";



const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/src/views")

console.log("hello");
app.listen(3000);

```

```pug
home.pug

doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Noom
  body 
    h1 It works!
```



`npm run dev` 작동확인



```
server.js

import express from "express";



const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")


app.get("/",(req,res)=> res.render("home"))
console.log("hello");
app.listen(3000);

```

`app.get("/",(req,res)=> res.render("home"))`

사용할 루트만들기 request랑 response를받고 home을 렌더하기



Express로 할일은 views를 설정해주고 render해주기 나머지는 웹소켓에서 실시간으로 됨



![image-20220125132258209](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125132258209.png)



작동한다.



```
home.pug

doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Noom
  body 
    h1 It works!
    script(src="/public/js/app.js")
```

script추가



```
server.js

import express from "express";



const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
console.log("hello");
app.listen(3000);

```

`app.use("/public",express.static(__dirname+"/public"))`

`http://localhost:3000/public/js/app.js`

페이지가 잘작동함



근데 views나 서버를 수정할때만 nodemon이 재시작 하게 하고싶음



```
nodemon.js

{
  "ignore":["src/public/*"],
  "exec": "babel-node src/server.js"
}

```



여기까지 간단한 node.js 설정작업

https://andybrewer.github.io/mvp/

https://pugjs.org/api/getting-started.html

그외 두사이트참조 간단한 pug와 mvp css사용



---

# WebRTC ZOOM클론코딩 #3

### HTTP VS WebSocket

둘다 프로토콜이다. 데이터 교환방식의 규칙일뿐

#### HTTP

```
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))
```

stateless : req,res과정뒤에 유저를 잃어버린다, 그저 보내고 받고 보내고 받고

브라우저가 리퀘스트, 서버가 리스폰드 GET,POST전부 이 방식, 실시간이 안됨

#### WebSocket

http랑은 전혀 다른방식 ws://

양방향 연결, 서버가 먼저 유저한테 메시지 보낼 수도 있음

브라우저<->서버 말고도 서버<->서버로 작동도가능함(HTTP도 마찬가지)

프로토콜일 뿐이다.



---

# WebRTC ZOOM클론코딩 #4

#### ws: a Node.js WebSocket library

https://github.com/websockets/ws



그냥 웹소켓을 위한 패키지 입니다.



추후 다른것도 사용해볼것, 채팅방이라던가 그런곳엔 ws만을 가지고 만들고 싶으면



알아서 구현해야하기 때문에 어렵다. 추후 다른 프레임워크 사용할것 아마 (https://socket.io/)



ws는 부가적인 유틸리티,기능이없다 그저 핵심기능일뿐, 하지만 최소 한 핵심은 알아야함



바닐라 js를하고 react를 하는 느낌으로 알고 있어야 한다.



`npm i ws` 웹소켓을 설치해준다

```js
server.js

import express from "express";
import http from "http"
import WebSocket from "ws";


const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))
// 어떤 url을 입력하던지 홈으로 가게함 다른폴더 접근 못하게 하기위함
// console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`)
// app.listen(3000,handleListen);

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
// 같은서버에서 http,웹소켓 둘다돌리는중 근데 꼭 둘다 안해도됨 지금은 같은 포트에 둘다 있길 원해서 
// 이렇게 하는것 http서버위에 web소켓 서버만듬 http://localhost:3000
//  두개의 프로토콜이 같은 포트를 공유하는것

server.listen(3000, handleListen)
```

이와같이 수정해줌

```js
import http from "http"
const server = http.createServer(app)
```

```js
import WebSocket from "ws";
const wss = new WebSocket.Server({ server })
```

http는 이미 node에 포함되어있다고하고

websocket을 ws에서 import해온다

이와같이하는데 웹소켓 서버만 만들어도되지만

지금은 둘다 같은포트 공유해서 하려고 http서버위에 웹소켓 서버를 띄운것

`const wss = new WebSocket.Server()` 즉 이렇게 되도 상관없다.



---

# WebRTC ZOOM클론코딩 #5

https://developer.mozilla.org/ko/docs/Web/API/WebSocket/WebSocket

![image-20220125224124720](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125224124720.png)

![image-20220125224132698](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220125224132698.png)

```js
app.js

// alert("hi")
// window.location.host
// window.location 은 좋은 옵션
// "ws://localhost:3000"
const socket = new WebSocket(`ws:${window.location.host}`);
// 여기서 socket은 서버로의 연결을 뜻함

socket.addEventListener("open",()=>{
  console.log("Connected TO Serser ^^")
})

socket.addEventListener("message",(message)=>{
  console.log("New message:",message.data," from the server")
})
// message에 많은 데이터 틀어있음 timestamp도

socket.addEventListener("close",()=>{
  console.log("DisConnected from SERVER X")
})


setTimeout(()=>{
  socket.send("hello from the browser!")
},10000)
```



```js
server.js

import express from "express";
import http from "http"
import WebSocket from "ws";


const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))
// 어떤 url을 입력하던지 홈으로 가게함 다른폴더 접근 못하게 하기위함
// console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`)
// app.listen(3000,handleListen);

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
// 같은서버에서 http,웹소켓 둘다돌리는중 근데 꼭 둘다 안해도됨 지금은 같은 포트에 둘다 있길 원해서 
// 이렇게 하는것 http서버위에 web소켓 서버만듬 http://localhost:3000
//  두개의 프로토콜이 같은 포트를 공유하는것


// 여기서의 socket은 연결된 브라우저를 뜻함
// function handleConnection(socket){
//   console.log(socket)

// }
// 아래두함수를써서 보기좋게 만들어도 좋다. 아래 콜백, 화살표함수로 안써도댐
function onSocketClose(){
  console.log("Disconnected from the Browser X")
}

function onSocketMessage(message){
  console.log(message.toString())
}


wss.on("connection",(socket)=>{
  // console.log(socket)
  console.log("Connected to Server ^~^")
  socket.on("close",()=>{
    console.log("Disconnected from the Browser X")
  })
  // socket.on("message",(message)=>{
  //   console.log(message)
  // })
  socket.on("message", (message) => {
    console.log(message.toString())
    })
  //<Buffer 68 65 6c 6c 6f 20 66 72 6f 6d 20 74 68 65 20 62 72 6f 77 73 65 72 21>
  socket.send("hello!hi!")
})


server.listen(3000, handleListen)
```

각각 app.js (프론트) servser.js(백엔드) 그리고 콘솔과 터미널에서 오가는 메세지들을보며



각 위치를 파악하는게 중요하다.



그리고 기본적으로 wss.on같이 가져와서 사용하는 websocket은 콜백함수형태로 가져와서 사용하는데



기존의 eventlistenner들과사용법이 비슷하다고 익혀두면 되겠다.



---

# WebRTC ZOOM클론코딩 #**6**

```js
server.js

import express from "express";
import http from "http"
import WebSocket from "ws";


const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))
// 어떤 url을 입력하던지 홈으로 가게함 다른폴더 접근 못하게 하기위함
// console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`)
// app.listen(3000,handleListen);

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
// 같은서버에서 http,웹소켓 둘다돌리는중 근데 꼭 둘다 안해도됨 지금은 같은 포트에 둘다 있길 원해서 
// 이렇게 하는것 http서버위에 web소켓 서버만듬 http://localhost:3000
//  두개의 프로토콜이 같은 포트를 공유하는것


// 여기서의 socket은 연결된 브라우저를 뜻함
// function handleConnection(socket){
//   console.log(socket)

// }


// 아래두함수를써서 보기좋게 만들어도 좋다. 아래 콜백, 화살표함수로 안써도댐
function onSocketClose(){
  console.log("Disconnected from the Browser X")
}

// function onSocketMessage(message){
//   console.log(message.toString())
// }


const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
});

// wss.on("connection",(socket)=>{
//   sockets.push(sockets)
//   // console.log(socket)
//   console.log("Connected to Server ^~^")
//   socket.on("close",()=>{
//     console.log("Disconnected from the Browser X")
//   })
//   // socket.on("message",(message)=>{
//   //   console.log(message)
//   // })
//   socket.on("message", (message) => {
//     sockets.forEach(aSocket=>aSocket.send(message.toString()))
//     // socket.send(message.toString())
//     // toString안해주면 blob처리됨 체크!
//     // console.log(message.toString())
//     })
//   //<Buffer 68 65 6c 6c 6f 20 66 72 6f 6d 20 74 68 65 20 62 72 6f 77 73 65 72 21>
//   socket.send("hello!hi!")
// })


server.listen(3000, handleListen)
```

```js
app.js

// alert("hi")
// window.location.host
// window.location 은 좋은 옵션
// "ws://localhost:3000"

const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")


const socket = new WebSocket(`ws:${window.location.host}`);
// 여기서 socket은 서버로의 연결을 뜻함

function handleOpen(){
  console.log("Connected TO Serser ^^")
}
socket.addEventListener("open",handleOpen)
// socket.addEventListener("open",()=>{
//   console.log("Connected TO Serser ^^")
// })

socket.addEventListener("message",(message)=>{
  console.log("New message:",message.data," from the server")
})
// message에 많은 데이터 틀어있음 timestamp도

socket.addEventListener("close",()=>{
  console.log("DisConnected from SERVER X")
})


// setTimeout(()=>{
//   socket.send("hello from the browser!")
// },10000)

function handleSubmit(event){
  event.preventDefault()
  const input = messageForm.querySelector("input")
  // console.log(input.value)
  socket.send(input.value)
  input.value=""
}

messageForm.addEventListener("submit",handleSubmit)
```

요약하면



```
const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
});
```

임시 저장소를 만들어줘서 다른 브라우저에서 접속하면 구분되게 해줌

일단 밑작업



---

# WebRTC ZOOM클론코딩 #7

![image-20220126015245130](WebSockect%20%EC%A0%95%EB%A6%AC.assets/image-20220126015245130.png)

닉네임만들게 지정, 메세지따로나오게 지정하기

```html
home.pug

doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Noom
    link(rel="stylesheet", href="https://unpkg.com/mvp.css")
  body 
    header 
        h1 Noom!
    main
        form#nick
            input(type="text",placeholder="choose a nickname",required)
            button Save 
        ul
        form#message
            input(type="text",placeholder="wirte message",required)
            button Send
    script(src="/public/js/app.js")
```

메인페이지에 폼들 추가해주고 디자인하구



```js
app.js

// alert("hi")
// window.location.host
// window.location 은 좋은 옵션
// "ws://localhost:3000"

const messageList = document.querySelector("ul")
const nickForm = document.querySelector("#nick")
const messageForm = document.querySelector("#message")
const socket = new WebSocket(`ws:${window.location.host}`);

function makeMessage(type,payload){
  const msg = {type,payload}
  return JSON.stringify(msg)
}

function handleOpen(){
  console.log("Connected TO Serser ^^")
}
socket.addEventListener("open",handleOpen)


socket.addEventListener("message",(message)=>{
  const li = document.createElement("li")
  li.innerText = message.data
  messageList.append(li)
  // console.log("New message:",message.data," from the server")
})
socket.addEventListener("close",()=>{
  console.log("DisConnected from SERVER X")
})

function handleSubmit(event){
  event.preventDefault()
  const input = messageForm.querySelector("input")
  socket.send(makeMessage("new_message",input.value))
  input.value=""
}

function handleNickSubmit(event){
  event.preventDefault()
  const input = nickForm.querySelector("input")
  socket.send(makeMessage("nickname",input.value))
  // socket.send({
  //   type:"nickname",
  //   payload:input.value
  // })

}

messageForm.addEventListener("submit",handleSubmit)
nickForm.addEventListener("submit",handleNickSubmit)
```

닉네임과 메세지 나오는 함수,폼을 새로지정



```js
function makeMessage(type,payload){
  const msg = {type,payload}
  return JSON.stringify(msg)
}
```

간단해 보이지만 난이게 되게 신박했다.



parse랑 JSON쓰는거는 알았지만 이거뭔가 도장찍어내듯이 유용한 함수를 뚝딱 만든느낌



---



```js
server.js 변경전

import express from "express";
import http from "http"
import WebSocket from "ws";


const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
function onSocketClose(){
  console.log("Disconnected from the Browser X")
}


const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    console.log(message.toString())
    const parsed = JSON.parse(message)
    // console.log(parsed)

    switch(parsed.type){
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(parsed.payload));
      case "nickname":
        console.group(parsed.payload)

    }

    // if (parsed.type ==="new_message"){
    //   sockets.forEach((aSocket) => aSocket.send(parsed.payload));
    // }else if(parsed.type==="nickname"){
    //   console.group(parsed.payload)
    // }
    // payload는 담겨져 있는 중요한 정보
  });
});


server.listen(3000, handleListen)

// {
//   type:"message",
//   payload:"hello everyone!"
// }
// {
//   type:"nickname",
//   payload:"nico"
// }
```



```js
server.js

import express from "express";
import http from "http"
import WebSocket from "ws";


const app = express();

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public",express.static(__dirname+"/public"))
app.get("/",(req,res)=> res.render("home"))
app.get("/*",(req,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
function onSocketClose(){
  console.log("Disconnected from the Browser X")
}


const sockets = []

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
        // socket 에 바로 이렇게 추가할 수 있다는거 알아두기
    }
  });
});


server.listen(3000, handleListen)

// {
//   type:"message",
//   payload:"hello everyone!"
// }
// {
//   type:"nickname",
//   payload:"nico"
// }
```

1)socket에 추가할수있는거 알기

2)간단한 스위치,케이스문

3)사용할 수 있으면 될것같다!!



하지만 실제로는 SOCKETIO로 사용하기때문에 한번 해본 경험과 이해만 하고 넘어가도 좋을거 같다.



