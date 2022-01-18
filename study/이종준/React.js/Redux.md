# Redux

Redux?

> 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너

일관적으로 동작하고, 서로 다른 환경에서 작동하고, 테스트하기 쉬운 앱을 작성하도록 도와줌.



설치

```
npm install redux
혹은
yarn add redux
```



바닐라js를 이용해 공부한 대략적인 사용법

```
import { createStore } from "redux"

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("span")

const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1
  } else if (action.type === "MINUS") {
    return count - 1
  } else {
    return count
  }
}


const countStore = createStore(countModifier)

countStore.dispatch({type: "ADD"})
countStore.dispatch({type: "ADD"})
countStore.dispatch({type: "ADD"})
countStore.dispatch({type: "ADD"})
countStore.dispatch({type: "MINUS"})
console.log(countStore.getState())
```

createStore의 인자로 reducer라는 함수를 받는다. reducer는 data를 바꾸고 modify하는 것을 책임지는 역할을 한다. 위의 코드에서는 숫자를 +하거나 -하는 역할을 수행한다.

reducer의 return값으로 데이터가 변경된다.

console.log(countStore)를 해보면, 반환값으로 네 개 정도의 함수들이 있다.

- dispatch(): reducer로 action을 보냄.
- getState(): reducer로 변경한 데이터의 현재 상태를 보여줌.
- replaceReducer()
- subscribe(): store 안에 있는 변화들을 알 수 있게 해줌.

count = 0처럼 reducer의 인자의 초기값을 지정해줄 수도 있다.

reducer의 두번째 인자로 action이 올 수 있다. action은 reducer와 소통하기 위한 방법이다. action은 반드시 type이 있는 object 형식이어야 한다.

dispatch()를 입력해서 reducer로 action을 보낼 수 있다.

위의 경우 ADD 네 번, MINUS 한 번이므로 최종적인 state는 3임을 알 수 있다.

subscribe는 변화한 값을 보여주는(?) 역할을 한다.

밑의 최종 코드를 보면,

```
import { createStore } from "redux"

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("span")

number.innerText = 0

const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1
  } else if (action.type === "MINUS") {
    return count - 1
  } else {
    return count
  }
}

const countStore = createStore(countModifier)

const onChange = () => {
  number.innerText = countStore.getState()
}
countStore.subscribe(onChange)

const handleAdd = () => {
  countStore.dispatch({type: "ADD"})
}

const handleMinus = () => {
  countStore.dispatch({type: "MINUS"})
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)
```

onChange라는 함수에 number의 값에 countStore에 있는 현재 값을 넣어주고, 이를 subscribe에서 변화된 값을 보여주게 된다.

위의 코드를 개선시켜보자. countModifier에서 if와 else를 쓰는데, 공식문서에서는 switch와 case로 불필요한 반복을 줄이는 방식을 취한다.

```
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1
    case MINUS:
      return count - 1
    default:
      return count
  }
}
```

그리고 string에서 흔히 일어날 수 있는 오타를 방지하기 위해 "ADD"와 "MINUS"를 다른 곳에 저장하고 사용하는 방법을 이용할 수 있다.

```
const ADD = "ADD"
const MINUS = "MINUS"

const handleAdd = () => {
  countStore.dispatch({type: ADD})
}

const handleMinus = () => {
  countStore.dispatch({type: MINUS})
}
```

