## 1강

* react에서는 그냥 bootstrap이 아니라
  react bootstrap을 사용

1. react bootstrap 설치
2. react bootstrap 사이트에서 css 링크 복사 붙여넣기





## 2강 react bootstrap

react bootstrap 에서 코드를 copy 할 때
copy 후 바로 쓰는 것이 아니라 코드 상단에
copy 코드에 있는 컴포넌트들을 import 해야함

react bootstrap페이지에 getting started에 예시 코드가 주어짐

```javascript
import { Button } from 'react-bootstrap';
```

버튼 구현 코드를 복사해오면 위와 같이 import 해줘야 함



* 특정 부분 배경에 배경사진 넣고싶은 경우
  우선 넣고싶은 곳에 className을 background로 주고 (다른거도 노상관)
  src 폴더에 이미지 넣고
  css에서 아래와 같이 치면 됨

  ```css
  .background {
      background-image: url('./background.jpg')
  }
  ```

  반드시 src안에 있는 파일은 경로를 무조건 ./부터 치기!!!!



* 그냥 bootstrap을 써도 되지만
  용량이 커지고 link 를 붙여놔야 하는 불편함





* background-size: cover; 
  배경화면이 창 크기에 따라 맞추어 조절됨