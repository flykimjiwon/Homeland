# README.md

# 🍻HomeLanDrink🍻

## ✅ **프로젝트 소개**

HomeLanDrink는 비대면으로 사람들과 술자리를 즐길 수 있는 그룹 비디오 기반의 랜선 술자리입니다. 다양한 기능을 통해 온라인으로도 술자리의 분위기을 느끼고 사람들과 함께 음주를 즐길 수 있습니다. 

- 서비스의 필요성
  
    코로나 19로 인하여 사회적으로 사람들간 만날 수 있는 기회가 적어지고 특히 시간적 제한으로 인해 예전과 같은 술자리를 갖는데 어려움을 겪고 있습니다. 현재 ZOOM, WEBEX와 같은 서비스를 사용하여 비대면 술자리를 갖는 모습들을 자주 볼 수 있는데 위 서비스들은 비지니스 회의에 특화되어 있는 서비스이기 때문에 사용자들이 술자리에서 원하는 니즈를 충족시키기 어렵습니다. 따라서 사용자들이 비대면 술자리에서 원하는 엔터테이너적 요소를 충족 시켜줄 수 있는 서비스의 필요성을 느꼈습니다. 
    
- 기대 효과
    1. 안전한 음주 : 코로나 19로 인해 오프라인 술자리가 위험해진 만큼 집에서 각자 안전하게 음주를 즐길 수 있습니다.
    2. 사회적 연결성 회복: 사회적 활동이 제한적인 요즘, 코로나 블루를 겪고 있는 사람들이 이 서비스를 통해 사람들과의 연결성을 확인하고 외로움을 해소할 수 있습니다.
    3. 제약 없는 술자리 : 거리 두기로 인한 영업시간 제한이 적용되어 밤 늦게까지 오프라인 술자리를 이어나가지 못하는데 이 서비스를 통해 시간과 장소의 제약을 없애고 새벽까지 즐길 수 있는 술자리를 만들 수 있습니다. 

## ✅ **주요 기능 **

1. 메인 화면
   
    ![메인화면](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B4.gif)
    
2. 그룹 채팅
   
    ![채팅](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EC%B1%84%ED%8C%85.gif)
    
    
    
2. 라이어게임
   
    ![라이어게임 고프레임](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EB%9D%BC%EC%9D%B4%EC%96%B4%EA%B2%8C%EC%9E%84%20%EA%B3%A0%ED%94%84%EB%A0%88%EC%9E%84.gif)
    
    
    
4. 스냅샷
   
    ![스냅샷](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EC%8A%A4%EB%83%85%EC%83%B7.gif)
    
5. 짠 효과

    ![짠효과저프레임](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EC%A7%A0%ED%9A%A8%EA%B3%BC%EC%A0%80%ED%94%84%EB%A0%88%EC%9E%84.gif)

6. 디바이스 권한 체크

    ![디바이스권한체크](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EB%94%94%EB%B0%94%EC%9D%B4%EC%8A%A4%EA%B6%8C%ED%95%9C%EC%B2%B4%ED%81%AC.gif)

    







## ✅ **서비스 아키텍쳐**

![스크린샷_2022-02-14_오후_3.56.42](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2022-02-14_%EC%98%A4%ED%9B%84_3.56.42.png)

## ✅ **개발 환경**

| Backend | Frontend | WebRTC | CI/CD |
| --- | --- | --- | --- |
| IntelliJ | Visual Studio Code | openvidu  | AWS EC2 |
| spring boot  | React 17.0.2 |  | Docker |
| Spring Security | React-bootstrap 2.1.1 |  | nginx |
| Java 11 | React-icons 4.3.1 |  | Jenkins |
| AWS EC2 | material-UI 5.4.1 |  |  |
| mysql | sweetalert2 11.4.0 |  |  |
| redis |  |  |  |

## ✅ **기술 특이점**

- SMTP 서버를 활용한 비밀번호 찾기
    - 구글 계정에서 제공해주는 SMTP 서버를 사용하여 비밀번호를 찾고 싶은 사용자에게 메일을 보내는 기능을 구현하였습니다. 링크의 경우, 그 url값을 고정시키지 않고 유동적으로 변경함으로써, 제시된 경로가 아니면 함부로 회원의 권한을 변경할 수 없도록 해야 합니다. 따라서 실용적인 목적을 위한 고유한 128비트 길이 값인 UUID를 생성하여 링크를 만들었습니다.
    - 회원가입 인증 메일을 요청한 사용자에 한해 몇 분 동안만 그 링크를 살아있게 하기위해 redis를 사용하여 보안적인 측면을 강화하였습니다.
    
- Openvidu
    - State에 담긴 데이터들을 Openvidu를 활용하여 Signal을 주고 받아 방에 참가한 인원들이 특정 기능을 동시에 작동할 수 있게 하였습니다.
    - Message의 경우 채팅을 보낸 사람일 때와 받는 사람일 때를 구분하여 class를 다르게 적용할 수 있도록 state에 class명을 전송하였고, 이를 통해 사용자들이 자신이 작성한 메세지와 다른 사람들이 작성한 메세지를 좌우로 구분하여 쉽게 알아볼 수 있도록 하였습니다.

- Deployment
    - Dockerfile을 작성하여 백엔드, 프론트엔드 소스 코드가 변경이 되더라도 반영하여 이미지를 생성할 수 있고, 이미지를 컨테이너로 실행시켜 손 쉽게 서버를 띄우고 관리할 수 있도록 하였습니다.
    - 애플리케이션 내에서 사용되는 URL, SECRET과 같은 정보들은 .env , [application.properties](http://application.properties) 등을 통해 환경 변수로 등록하여 사용할 수 있게 하였습니다.

## ✅ **협업 툴**

- Gitlab

```
<Git Convention>
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
DESIGN : CSS 등 사용자 UI 디자인 변경
!HOTFIX: 급하게 치명적인 버그를 고쳐야하는 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
COMMENT: 필요한 주석 추가 및 변경
DOCS:    문서를 수정한 경우
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제

예시) FEAT: 로그인 기능 추가
```

- Jira
    - 협업 및 일정, 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 회의에서 한 주 동안 진행되어야 할 주 단위 계획을 짜고, 진행할 이슈들을 스프린트를 만들어 등록했습니다. 스프린트는 일주일 단위로 진행하였습니다.
        1. Epic : 큰틀로써 여러 스토리와 테스크의 집합으로 사용하였습니다. 
        2. story : 개발 일정의 경우 story로 할당하였습니다
        3. task : 관련 학습이나 문서 작업의 경우 task로 할당하였습니다.
- Mattermost
- Discord
    - 백엔드, 프론트엔드, 종합 회의방등을 나누어 필요에 따라 입장하여 의견을 나누었습니다. 또한 각 기능별로도 방을 나누어 각 기능의 프론트엔드와 백엔드가 모여 소통하였습니다.

## ✅ **포트 정리**

| 443 | server default(nginx, https) |
| --- | --- |
| 80 | server default(nginx, http)(redirect to 443) |
| 5443  | Openvidu |
| 5442 | Front (react) |
| 8443 | REST API(spring boot) |
| 3478 | coturn 서버 |
| 8888  | Kurento Media 서버 |
| 3306 | mySql |
| 6379 | redis(openvidu에서 사용) |
| 6380 | redis(backend에서 사용) |
| 8001 | jenkins |

## ✅ **팀 소개**

| 👻 김승환 | 😺 김지원 | 🧚‍♂️ 이종준 | 🐸 김근태 | 🦖 박성건 | 🌸 고재현 |  |
| --- | --- | --- | --- | --- | --- | --- |
| https://github.com/Panseung/ | https://github.com/flykimjiwon | https://github.com/leecoder92 |  | https://github.com/rudy0103 | https://github.com/jaehyeon98 |  |
| Frontend, 팀장 | Frontend | Frontend | Backend, Frontend | Backend | Backend |  |