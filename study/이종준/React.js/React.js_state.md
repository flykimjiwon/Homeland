# State

### React에서 state란?

- 기본적으로 데이터가 저장되는 곳!

밑의 코드를 한번 보자

```html
const root = document.getElementById("root")

let counter = 0
function countUp() {
  counter = counter + 1
  render()
}

function render() {
  ReactDOM.render(<Container />, root)
}

function Container() {
  return (
    <div>
      <h3>Total clicks: {counter}</h3>
      <button onClick={countUp}>Click me</button>
    </div>
  )
}    
    
render()
```

위는 countUp 함수를 통해 counter를 증가시키고, 그때마다(데이터가 바뀔 때마다) render함수를 다시 실행(re-render)함으로써 값을 변화시켜주는 방식이다.

버튼을 누를 때마다 요소에서 숫자만 바뀌는 걸 확인할 수 있다.

React는 굉장하기 때문에, 새로 렌더링하더라도 전체를 전부 재생성할 필요 없이 바뀐 부분만 새로 생성할 수 있도록 도와준다.

하지만 이는 최고의 방법은 아니다.(더 좋은 방법이 있다는 말!) 왜냐하면 계속해서 render해주는 것을 잊으면 안 되기 때문이다.

더 좋은 방법이란, (함수를 계속 불러줄 필요 없이)데이터를 보관하고 자동으로 리렌더링을 일으킬 수 있는 방법이 될 것이다. 그것을 가능하게 하는 것이 state라는 것이다!

```
const data = React.useState(0)
console.log(data)
```

이를 실행하고 콘솔을 확인해 보면,

```
[0, f]
```

라는 결과를 얻을 수 있다. useState를 통해 초기값이 0인 데이터, 그리고 데이터의 값을 바꿀 수 있는 함수 f가 들어있는 배열을 얻을 수 있음을 알게 됐다.

맨 위 코드에서 counter와 countUp함수 두 가지 기능을 전부 가지고 있는 셈이다.

좀 더 세련되게 코드를 바꿔보자

```
let [counter, modifier] = React.useState(0)
```

이렇게 하면 counter에 데이터를, modifier에 함수를 선언해줄 수 있다.



코드를 조금 수정해서 아래와 같이 작성해보자.

```
function App() {
  let [counter, setCounter] = React.useState(0)
  const onClick = () => {
    setCounter(counter + 1)
  }
  return (
    <div>
      <h3>Total clicks: {counter}</h3>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}
```

버튼을 클릭하면, onClick event가 호출되고, setCounter라는 함수를 통해 counter의 값을 변화시키고, 이를 다시 리렌더링할 수 있게 되었다.

setCounter의 인자로 변경할 데이터 값을 입력해주면 된다.



그런데, counter변수가 다른 곳에서도 변경이 될 가능성이 있기 때문에 위 방법은 개선될 필요가 있다.

```
setCounter((current) => current + 1)
```

setCounter에 들어오는 인자를 받아서, setCounter 내에서 함수를 이용해서 처리하면 React는 이 current가 확실히 현재 값이라는 것을 보장해준다.

정리하면, 현재 state를 바탕으로 다음 state를 계산하고 싶다면 함수를 이용하면 된다!



# Inputs and State

```
function App() {
  let [minutes, setMinutes] = React.useState()
  const onChange = (event) => {
    setMinutes(event.target.value)
  }
  return (
    <div>
      <h1>Super Converter</h1>
      <label htmlFor="minutes">Minutes</label>
      <input onChange={onChange} value={minutes} id="minutes" placeholder="Minutes" type="number" />
      <h4>You want to convert {minutes}</h4>
      <label htmlFor="hours">Hours</label>
      <input id="hours" placeholder="Hours" type="number" />
    </div>
  )
}
```

위 코드는 최종적으로 분을 입력하면 그것을 시간으로 바꿔줄 기능을 수행할 코드가 될 것이다.

JSX에서는 label tag에서 for 대신 htmlFor를 사용한다.

minutes input에 입력을 하면 onChange event가 호출되고, event가 전달돼서 event.target.value를 setMinutes에 인자로 전달하면 minutes의 값이 바뀌게 된다.

