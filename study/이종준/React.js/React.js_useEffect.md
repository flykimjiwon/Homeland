# useEffect

Effect Hook이란?

> 함수 컴포넌트에서 side effect를 수행할 수 있습니다. - React 공식문서

useEffect Hook을 이용하여 React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지를 말할 수 있다.

기본적인 모양새는 다음과 같다.

```
import { useEffect } from 'react'

useEffect(effect, [, deps])
```

effect는 함수로서, 렌더링 이후 실행할 함수이다. React는 이 함수를 기억했다가 DOM 업데이트 이후에 불러내게 된다.

[deps]는 특정 값이 변경될 때 effect함수를 실행시키고 싶을 경우 배열 안에 그 특정 값을 넣어주는 데 활용한다.

빈 배열로 남겨놓을 수도 있는데, 빈 배열을 입력할 경우에는 컴포넌트가 Mount될 때에만 실행된다.



Clean-up을 이용하는 Effects

외부 데이터에 구독(subscription)을 설정해야 하는 경우, 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것이 중요하다.

즉, 데이터의 변화에서 데이터가 없어질 때(?) 정리하려고 실행되는 부분으로 이해했다.

(To destroy the component)

```
// useEffect 내부에
useEffect(() => {
  console.log("created")
  return () => console.log("destroyed")
}, [])
```

clean-up 하는 시점:

컴포넌트가 마운트 해제되는 때에 정리를 실행한다.