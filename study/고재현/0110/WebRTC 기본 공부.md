# WebRTC 기본 개념

### WebRTC란?

**WebRTC**(Web Real-Time Communication)은 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술. WebRTC를 구성하는 일련의 표준들은 플러그인이나 제 3자 소프트웨어 설치 없이 종단 간 데이터 공유와 화상 회의를 가능하게 한다.



### P2P 절차

WebRTC는 P2P 방식의 커뮤니케이션이므로 각각의 웹 브라우저는 아래와 같은 절차를 밟아야 한다

1. 각 브라우저가 P2P 커뮤니케이션에 동의
2. 서로의 주소를 공유
3. 보안 사항 및 방화벽 우회
4. 멀티미디어 데이터를 실시간으로 교환

문제점: 브라우저는 웹 서버가 아니기 때문에 외부에서 접근할 수 있는 주소가 없어 2,3 번 단계에서 문제가 생긴다



### STUN, TURN

![stun](https://wormwlrm.github.io/img/posts/2021-01-24/1.png)

- STUN 서버:  STUN 서버는 인터넷의 복잡한 주소들 속에서 유일하게 자기 자신을 식별할 수 있는 정보를 반환해줌. 즉, WebRTC 연결을 시작하기 전에 STUN 서버를 향해 요청을 보내면, STUN 서버는 NAT 뒤에 있는 피어(Peer)들이 서로 연결할 수 있도록 공인 IP와 포트를 찾아줌.
- **하지만** 불가능한 경우(방화벽 정책, 제한) TURN 서버를 대안으로 사용
- TURN 서버: 네트워크 미디어를 중개하는 서버, 보안 정책이 엄격한 개인 NAT 내부에 위치한 브라우저와 P2P 통신을 할 수 있는 유일한 방법
- STUN과 TURN 서버는 ICE 프레임워크(= 두 개의 단말이 P2P 연결을 가능하게 하도록 최적의 경로를 찾아주는 프레임 워크) 위에서 이루어짐



### SDP

SDP(Session Description Protocol)는 WebRTC에서 스트리밍 미디어의 해상도나 형식, 코덱 등의 멀티미디어 컨텐츠의 초기 인수를 설명하기 위해 채택한 프로토콜이다. (예를 들면, 웹캠 비디오의 해상도, 오디오 전송 또는 수신 여부 전송 가능) 

미디어와 관련된 초기 세팅 정보를 기술하는 SDP는 제안 / 응답 모델(Offer/Answer)을 갖고 있다. 그러니까 어떤 피어가 이러한 미디어 스트림을 교환할 것이라고 제안을 하면, 상대방으로부터 응답이 오기를 기다린다

그렇게 *응답* 을 받게 되면, 각자의 피어가 수집한 ICE 후보 중에서 최적의 경로를 결정하고 협상하는 프로세스가 발생한다. 수집한 ICE 후보들로 패킷을 보내 가장 지연 시간이 적고 안정적인 경로를 찾는 것이다. 이렇게 최적의 ICE 후보가 선택되면, 기본적으로 필요한 모든 메타 데이터와 IP 주소 및 포트, 미디어 정보가 피어 간 합의가 완료된다.

이 과정을 통해 피어 간의 P2P 연결이 완전히 설정되고 활성화된다. 그 후 각 피어에 의해 로컬 데이터 스트림의 엔드포인트가 생성되며, 이 데이터는 양방향 통신 기술을 사용하여 최종적으로 양방향으로 전송된다.



### 시그널링

![시그널링](https://www.html5rocks.com/ko/tutorials/webrtc/infrastructure/jsep.png)

TCPeerConnection 통신에 사용할 프로토콜, 채널, 미디어 코덱 및 형식, 데이터 전송 방법, 라우팅 정보와 NAT 통과 방법을 포함한 통신 규격을 교환하기 위해 두 장치의 제어 정보를 교환하는 과정을 의미한다. 

 시그널링은 WebRTC 자체에서 지원하는 기능이 아니기 때문에  개발자는 자신에게 맞는 최적의 방법을 선택적으로 적용할 수 있다. 일반적으로 두 개의 장치를 연결할 수 있는 시그널링 서버를 직접 구축하거나, 시그널링 서버를 제공해주는 외부 솔루션을 적용할 수 있다 만약 시그널링 서버를 직접 구축한다면 웹 소켓(Web Socket)이나 서버 전송 이벤트(Server-sent Event) 방법을 적용할 수 있다.

- spring boot 시그널링 서버 구축

  ```java
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-websocket</artifactId>
      <version>2.4.0</version>
  </dependency>
  ```

  ```java
  @Configuration
  @EnableWebSocket
  public class WebSocketConfiguration implements WebSocketConfigurer {
  
      @Override
      public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
          registry.addHandler(new SocketHandler(), "/socket")
            .setAllowedOrigins("*");
      }
  }
  ```

  

### 미디어 서버

![img](https://blog.kakaocdn.net/dn/3ae7X/btqVSuq0WxW/OCv3CObABsyKvDQbj0Pjy1/img.png)

원래 WebRTC는 기본적으로 P2P 방식으로 동작된다. 하지만 만약에 M:N이나 1:N을 구현하기 위해서는 매시 구조를 가져가야하는데 이는 네트워크 리소스를 매우 많이 잡아먹고 클라이언트에 부담을 굉장히 많이 주게된다. 

 **해결책: 중간에 중계를 해주는 서버가 필요함 = 미디어 서버**

- 미디어 서버를 통한 WebRTC의 두가지 종류

  - SFU 방식

    ![img](https://blog.kakaocdn.net/dn/y4uuv/btqVOrWc9nv/zXsMk2Mm9SyBDOzXsDbwy0/img.png)

    SFU 방식은 단순히 받은 데이터를 연결된 Peer들에게 뿌려준다. 중간 처리를 하지 않고 그대로 보내주기 때문에 서버에 부하가 상대적으로 적은 방식이다. WebRTC는 HTTPS를 반드시 통해야 하기 때문에 암호화, 복호화, 연결관리 등의 역할을 해준다.

    

  - MCU 방식

    ![img](https://blog.kakaocdn.net/dn/cJNG3o/btqVTGLy8nf/GkoY5kfjWlmRuKSLeGooe1/img.png)

    

    MCU 방식은 중앙에서 비디오를 인코딩 등과 같은 전처리를 하여 피어에게 다시 전달 해 주는 역할을 한다. 즉, 중간에서 믹싱을 해준다. 따라서, 인코딩을 통해서 압축률을 좋게 하여 각 피어들에게 던져주면 네트워크 리소스 비용에서는 유리하나 중앙에서 처리해주는 서버의 CPU리소스를 많이 잡아먹는다는 단점이 있다.

    

[참고 사이트]

 https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API

https://www.baeldung.com/webrtc

https://wormwlrm.github.io/2021/01/24/Introducing-WebRTC.html

https://andonekwon.tistory.com/71



