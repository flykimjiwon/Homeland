# Library & Framework

## Library
라이브러리는 주로 소프트웨어를 개발할 때 컴퓨터 프로그램이 사용하는 비휘발성 자원의 모임이다.  
여기에는 구성 데이터, 문서, 도움말 자료, 메시지 틀, 미리 작성된 코드, 서브루틴(함수), 클래스, 값, 자료형 사양을 포함할 수 있다.  
개발자가 코드를 컨트롤 한다. 개발자가 코드를 작성하다가 필요할때 불러와서 사용한다. 라이브러리 그 자체로 독립성을 가지며 개발자가 능동적으로 사용한다.

## Framework
웹 프레임워크는 동적인 웹 페이지나, 웹 애플리케이션, 웹 서비스 개발 보조용으로 만들어지는 애플리케이션 프레임워크의 일종이다.  
웹 페이지를 개발하는 과정에서 겪는 어려움을 줄이는 것이 주 목적으로 통상 데이터베이스 연동, 템플릿 형태의 표준, 세션 관리, 코드 재사용 등의 기능을 포함하고 있다.  
개발자가 누군가의 규칙에 따라 코딩을 한다. 어디에 코드를 넣어야 하는지, 어디에 템플릿, 컨트롤러, view를 넣는지 명백한 규칙에 따라 수동적으로 사용한다.

## 대체 React는 Library인가? Framework인가?
개발자마다 의견이 분분하지만 리액트 공식 웹사이트에서는 라이브러리라고 소개하고있다.(A JavaScript library for building user interfaces)  
어플리케이션의 ui를 빌드하기위해 리액트 컴포넌트를 불러와 사용한다면 리액트는 라이브러리가 맞다.  
그러나 리액트가 우리의 컴포넌트를 불러온다면 프레임워크로 부를 수 있다. 왜냐하면 규칙을 알려주고 뭐가 틀린지 맞는지 알려주기 때문이다.  
혹자는 리액트의 생태계는 프레임워크이지만 리액트만은 라이브러리라고 한다.  
프레임워크로 부르기 위해서는 기본적으로 상태관리나 라우터 기능등을 내장 하고 있어야 한다.  
리액트에서 이러한 기능들을 구현하기 위해서는 여러가지 추가적인 라이브러리를 같이 사용해야한다.(react-router, react-redux 등등) 

**출처**  
[라이브러리 (컴퓨팅)](https://ko.wikipedia.org/wiki/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC_(%EC%BB%B4%ED%93%A8%ED%8C%85))  
[웹 프레임워크](https://ko.wikipedia.org/wiki/%EC%9B%B9_%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC)  
[이제 React.js 를 버릴 때가 왔다](https://seokjun.kim/time-to-stop-react)  
[프레임워크와 라이브러리(React는 뭐야?)](https://okayoon.tistory.com/entry/%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC%EC%99%80-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%ACReact%EB%8A%94-%EB%AD%90%EC%95%BC)  
[라이브러리? 프레임워크? 차이점 아직도 모름? 5분 순삭.](https://www.youtube.com/watch?v=t9ccIykXTCM&t=334s&ab_channel=%EB%85%B8%EB%A7%88%EB%93%9C%EC%BD%94%EB%8D%94NomadCoders)
