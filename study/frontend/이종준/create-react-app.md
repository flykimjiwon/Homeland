# create-react-app

React.js를 이용해서 프로젝트를 진행하기 위해 하나하나 전부 파일을 만들고 세팅할 필요 없이, create-react-app을 이용하면 된다.

```
npx create-react-app [앱 이름]
```

명령 프롬프트에 위와 같이 입력하면 node.js에서 알아서 React 프로젝트에 필요한 구성 요소들을 전부 세팅해준다!!

그런데, 한가지 문제(에러)에 직면했다...

```
You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.0).

We no longer support global installation of Create React App.

Please remove any global installs with one of the following commands:
- npm uninstall -g create-react-app
- yarn global remove create-react-app

The latest instructions for creating a new app can be found here:
https://create-react-app.dev/docs/getting-started/
```

잘 읽어보면, 4.0.3 버전의 create-react-app을 더 이상 지원하지 않기 때문에 삭제한 후 최신 버전(5.0.0)으로 설치하라는 의미인 것 같다.

그래서 stackoverflow에 검색해 봤더니,

```
npx create-react-app@5.0.0 [앱 이름]
```

으로 5.0.0버전의 새로운 create-react-app을 설치하면 된다고 해서 했더니 한번에 해결되었다.

![create-react-app 초기 구조](create-react-app.assets/create-react-app 초기 구조.png)

my-app이라는 이름으로 프로젝트를 시작한 경우 생성되는 디렉터리 구조는 다음과 같다.

### node_modules

외부 모듈을 설치할 경우 node_modules 디렉토리에 다운로드된다.

모듈을 사용할 경우 import하면 node_modules에서 해당 모듈을 찾게 된다.

### public

index.html과 같은 정적 파일들이 있다.

### src

JS, CSS 등 실제로 프로젝트를 수행하는 데 필요한 기능들을 수행할 핵심들이 모여있는 곳이라고 이해했다.

index.js, App.js 등이 있다.

#### index.js

index.html에 root id를 가진 div가 있는데, 그곳에 들어갈 component의 짜임새를 보여준다.

ReactDOM.render() 안에 들어있는 컴포넌트들을 보여준다.

![index_js](create-react-app.assets/index_js.png)

#### App.js

React의 로고, 공식사이트 링크 등을 보여주는 App() 함수가 들어있다. 하나의 컴포넌트로 생각하면 될 것 같고, 이름도 자유롭게 수정해서 사용하면 될 것 같다.

![app_js](create-react-app.assets/app_js.png)

### package.json

프로젝트의 종속성을 처리하고 패키지 매니저가 프로젝트를 식별할 수 있는 정보, 프로젝트 설명, 버전, 라이센스 정보 등 메타데이터를 제공한다.

### package-lock.json

서로 같은 버전의 패키지를 설치할 수 있게 하는 패키지 잠금 파일.

django를 이용할 때 환경 세팅 정보를 requirements.txt에 freeze했었는데, 이와 유사한 기능을 가진 파일이라고 이해했다.



필수적으로 살펴봐야 할 것들은 여기까지인 것 같다.



## 프로젝트 실행

```
npm run start
혹은
npm start
```

명령어를 실행하면 프로젝트가 실행된다.

![image-20220113140055947](create-react-app.assets/image-20220113140055947.png)

실행하면 다음과 같이 프로젝트가 실행된다.

