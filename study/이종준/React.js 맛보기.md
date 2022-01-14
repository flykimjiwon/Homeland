# React의 활용

※ HTML의 body 부분에 tag를 이용해 직접 작성하지 않고, script를 이용해 모든 걸 해결할 수 있다!

다음 vanilla JavaScript를 이용한 코드를 보자

```html
<!DOCTYPE html>
<html>
  <body>
    <span>Total clicks: 0</span>
    <button id="btn">Click me</button>
  </body>
  <script>
    let counter = 0
    const button = document.getElementById("btn")
    const span = document.querySelector("span")
    function handleClick() {
      counter = counter + 1
      span.innerText = `Total clicks: ${counter}`
    }
    button.addEventListener("click", handleClick)
  </script>
</html>
```

그리고, 다음 React를 활용한 코드와 위 코드를 비교해보자

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root")

    const Title = () => (
      <h3 
        id="title" 
        onMouseEnter={() => console.log('mouse enter')}
      >
      Hello I'm a title
      </h3>
    )

    const Button = () => (
      <button
        style={{backgroundColor: "tomato",}} 
        onClick={() => console.log('im clicked')}
      >
      Click me
      </button>
    )

    const Container = () => (
      <>
        <Title />
        <Button />
      </>
    )

    ReactDOM.render(<Container />, root)
  </script>
</html>
```

React를 활용하면, body에 직접 작성하지 않고 script 태그를 이용하여 HTML을 작성할 수 있다.



그런데, 보통 React를 활용하여 프로젝트를 할 때는 위와 같이 HTML에 작성하지 않고 create-react-app과 같은 방법을 활용하여 프로젝트를 구성해서 사용한다. 위는 그저 React를 공부하기 위해서!



# React.js CDN

React.js CDN은 다음과 같다

```
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

그저 html 내에 넣어주면 끝!