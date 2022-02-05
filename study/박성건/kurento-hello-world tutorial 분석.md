# kurento-hello-world tutorial 분석

[kurento hello-world](https://doc-kurento.readthedocs.io/en/latest/tutorials/java/tutorial-helloworld.html)





# 1. External Libraries

+  kurento 관련 라이브러리 

![image-20220113133745476](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113133745476.png)







+ spring, spring-boot 라이브러리

  ![image-20220113133925073](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113133925073.png)

+ netty

  ![image-20220113181047689](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113181047689.png)

  
  
  
  
  



--------------------------------------

## 2. Logic of the application

1. 로컬 스트림이 KMS에 보내진다.
2. 보내진 스트림은 변경 없이 클라이언트에게 다시 보내진다

이를 구현하기 위해서는 Media Pipeline이 필요하다.

아래는 Media Pipeline 을 그려 놓은 그림이다. (공식 docs에 나온 그림)

![Kurento Hello World Media Pipeline in context](https://doc-kurento.readthedocs.io/en/latest/_images/kurento-java-tutorial-1-helloworld-pipeline.png)

이것은 웹 어플리케이션으로 클라이언트-서버 architecture다.

client-side 로직은 자바스크립트로 구현되었고,server-side 로직은 스프링부트 기반 어플리케이션 서버로 Kurento Java Client API를 이용하여 KMS서버를 제어한다.



개체간의 통신을 위해서 2가지 웹 소켓이 사용된다.

1. A WebSocket is created between client and application server to implement a custom signaling protocol.

   하나는 클라이언트와 어플리케이션 서버에 생성되어 custom signaling protocol을 구현하기위해 사용된다.

2. Another WebSocket is used to perform the communication between the Kurento Java Client and the Kurento Media Server.

   다른 하나의 웹 소켓은 Kurento Java Client와 KMS간의 통신을 위해 사용된다.

This communication takes place using the **Kurento Protocol**. For a detailed description, please read this section: [Kurento Protocol](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html).



아래는 완성된 sequence diagram이다.

![Complete sequence diagram of Kurento Hello World (WebRTC in loopbak) demo](https://doc-kurento.readthedocs.io/en/latest/_images/kurento-java-tutorial-1-helloworld-signaling.png)

[출처](https://doc-kurento.readthedocs.io/en/latest/tutorials/java/tutorial-helloworld.html#id2) - kurento docs



루프백 구조로 이루어져 있지만 처음 보는데 복잡해 보인다.

Kurento Protocol에 대한 이해가 먼저 필요할 것 같다.

[Kurento Protocol](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html)



--------------------------------

## 3. Application Server Logic

This demo has been developed using **Java** in the server-side, based on the [Spring Boot](https://doc-kurento.readthedocs.io/en/latest/glossary.html#term-Spring-Boot) framework, which embeds a Tomcat web server within the generated maven artifact, and thus simplifies the development and deployment process.

아래 그림은 class diagram이다.

![Server-side class diagram of the HelloWorld app](https://doc-kurento.readthedocs.io/en/latest/_images/HelloWorld.png)







main class는 HelloWorldApp이다.

KurentoClient는 스프링 빈으로 객체화 된다.->해당 클래스는 쿠렌토에서 제공하는 클래스

이 빈은 Kurento Media Pipelines 를 생성하는데 사용된다.(미디어 기능을 활용하기 위해서 파이프 라인이 생성되어야한다.)

인스턴스화 될때 KMS 서버의 위치를 지정해 줘야한다.



Once the *Kurento Client* has been instantiated, you are ready for communicating with Kurento Media Server and controlling its multimedia capabilities.

Kurento Client가 인스턴스화 되면 KMS와 커뮤니케이션하고 KMS의 멀티미디어 기능을 제어할 준비가 된다.



```java
@SpringBootApplication
@EnableWebSocket
public class HelloWorldApp implements WebSocketConfigurer {
  @Bean
  public HelloWorldHandler handler() {
    return new HelloWorldHandler();
  }

  @Bean
  public KurentoClient kurentoClient() {
    return KurentoClient.create();
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(handler(), "/helloworld");
  }

  public static void main(String[] args) throws Exception {
    SpringApplication.run(HelloWorldApp.class, args);
  }
}
```



the main app class implements the interface `WebSocketConfigurer` to register a `WebSocketHandler` that processes WebSocket requests in the path `/helloworld`.



메인 app class는 /helloworld 경로에서 WebSocket 요청을 처리하는 핸들러는 등록하기 위해 WebSocketConfigurer를 implements한다.

------------------------------------------

class HelloWorldHandler는  text WebSocket requests를 핸들링하기 위해 

TextWebSocketHandler implements한다.

(class diagram에서는 HelloWorldHandler지만 실제 클래스 이름은 Handler다.)

이  Handler 클래스에서 handleTextMessage를 오버라이드 하는데 session과 message를 파라미터로 받는다.

이 함수는 Handler 클래스의 핵심 method다.

이 함수는 요청에 대한 작업을 구현하고 , WebSocket을 통해 응답을 반환한다.

```java
@Override
public void handleTextMessage(WebSocketSession session, TextMessage message)
    throws Exception {
  [...]
  switch (messageId) {
    case "start":
      start(session, jsonMessage);
      break;
    case "stop": {
      stop(session);
      break;
    }
    case "onIceCandidate":
      onRemoteIceCandidate(session, jsonMessage);
      break;
    default:
      sendError(session, "Invalid message, ID: " + messageId);
      break;
  }
  [...]
}
```



The `start()` method performs the following actions:

- **Configure media processing logic**. This is the part in which the application configures how Kurento has to process the media. In other words, the media pipeline is created here. To that aim, the object *KurentoClient* is used to create a *MediaPipeline* object. Using it, the media elements we need are created and connected. In this case, we only instantiate one *WebRtcEndpoint* for receiving the WebRTC stream and sending it back to the client.

-----------------------------------------------------------------

