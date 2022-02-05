## 3강 외부 파일 data.js에 데이터를 저장하고 불러오기



* export default 변수명 : 현재 파일의 변수를 다른 파일에서 쓸 수 있게 해주는 기능
  대부분 페이지 맨 마지막에 옴
  페이지에서 단 한번만 쓸 수 있음
  여러개 보내고 싶은경우

  ```javascript
  export { name, name2, name3}
  ```

  이런식으로 보냄

  

* 쓰기 위해서는 import 변수명 from './data.js'; 쓰기





## 4강 component 반복문 & 데이터 바인딩

* **props로 자식 컴포넌트에 state 보내기 & component 반복문 돌리기**

  ```javascript
  <div className="container">
    <div className="row">
      { shoes.map((shoe, i)=> {
          return <Product shoes={shoes[i]} i={i} key={i}></Product>
      })}
    </div>
  </div>
  
  function Product(props){
    return (
      <div className="col-md-4">3분할이야
        <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} width="100%"></img>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content} & {props.shoes.price}</p>
      </div>
    )
  }
  ```

  * **주의!** 자식 컴포넌트에서 쓸때는 반드시 `props.` 을 붙여주기
  * **src에 변수**를 입력할 때는 위와 같이 ""을 두 부분으로 쪼개고 중간에 연산이 필요하면 괄호 치고 연산 가능!





#### 위 과정은 React 개발자가 정말 자주 하는 일!

- 서버에서 사이트 구성에 필요한 데이터를 받아온 후
  HTML로 보여주는게 프론트엔드 개발자의 역할!





## 5강 : 라우팅(페이지 나누기)

* react-router-dom 라이브러라 사용

* 설치 명령어
  npm install react-router-dom@5

#### setting

1. index.js 에서
   import { BrowserRouter } from 'react-router-dom';
   작성
   * (from 뒤에 '/'와 같이 경로가 아니면 보통 라이브러리!)
2. 이후 index.js에서
   `<App/>` 이라고 작성된 부분을
   `<BrowserRouter>`
     `<App/>`
   `<BerowserRouter>`
   와 같이 감싸준다

### `<HashRouter>`

* `<BrowserRouter>` 대신 `<HashRouter>` 써도 똑같음
  다만 HashRouter는 라우팅을 좀 더 안전하게 할 수 있게 도와줌
  주소창에 /#/와 같이 뒤에 추가로 붙는데 
  시스템상 /#/ 뒤에 오는 것들은 절대 서버로 전송되지 않음
  따라서 react가 안전하게 라우팅을 할 수 있음

3. App.js 에서 
   import { Link, Route, Switch } from 'react-router-dom';
   입력 후

   ```javascript
   <Route path="/">
     <div>메인페이지에요</div>
   </Route>
   <Route path="/detail">
     <div>디테일이에요</div>
   </Route>
   <Route path="/어쩌구~" component={ Modal } ></Route>
   ```

   주소창에 detail을 붙이냐 안붙이냐에 따라 다르게 나옴
   메인페이지에요, 디테일이에요 부분에 html을 다 적어 넣으면 됨
   혹은 가장 아래 코드 처럼 특정 url로 들어가면 component를 보여주게 할 수도 있음

   주의!!!!!
   detail로 들어가면
   메인페이지에요, 디테일이에요 둘 다 뜨게 되는데
   이는 Router의 특성상 매칭되는 모두를 보여줌
   이것이 싫으면

   ```javascript
   <Route exact path="/">
     <div>메인페이지에요</div>
   </Route>
   ```

   위와 같이 exact를 붙여주면 
   딱 맞게 매칭됐을때만 보여주게 할 수 있음

