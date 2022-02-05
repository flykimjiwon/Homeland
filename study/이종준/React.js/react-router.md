# React-router

- 설치방법

```
npm install react-router-dom@6
```

- 기본적인 사용방법

```
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Home from './routes/Home'
import Detail from './routes/Detail'


function App() {
  return <Router>
    <Switch>
      <Route path="/movie/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
}
```

위 코드는 영화 정보를 보여주는 웹 서비스 프로젝트의 일부이다.



BrowserRouter는 HTML5의 History API를 사용하여 URL과 UI를 동기해주는 라우터이다. 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 해주고, 현재 주소에 관련된 정보를 props로 조회 및 사용이 가능하도록 해준다.



Switch는 Route를 찾는 역할을 한다. Route는 URL을 의미한다. Route 안의 path에 URL을 설정해줄 수 있다.

Route를 찾으면 컴포넌트를 렌더링한다.



Route에 있는 path에 `:{}` 형식으로 parameter를 보낼 수 있다. 위의 코드에서는 영화의 id를 이용해서 한 영화의 상세정보를 볼 수 있도록 했는데, 그 기준을 id로 잡은 것이다.

그렇게 보낸 parameter는 useParams를 이용해서 받을 수 있다.

```
import { useParams } from 'react-router-dom'

const {id} = useParams()
```



또한 Link라는 것이 있다. 이것은 `<a>` 태그 대신에 특정 URL로 보내는 링크를 만들 때 사용할 수 있다.

```
import { Link } from 'react-router-dom'

...
<Link to={`/movie/${id}`}>
  {title}
</Link>
```

