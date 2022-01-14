# [Kurento Protocol](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id2)

각 링크는 Kurento documentation으로 이동하는 링크이다.

- [Kurento Protocol](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#kurento-protocol)
  - [JSON-RPC message format](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#json-rpc-message-format)
    - [Request](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#request)
    - [Successful Response](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#successful-response)
    - [Error Response](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#error-response)
  - [Kurento API over JSON-RPC](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#kurento-api-over-json-rpc)
    - [Ping](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#ping)
    - [Create](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#create)
    - [Describe](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#describe)
    - [Invoke](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#invoke)
    - [Release](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#release)
    - [Subscribe](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#subscribe)
    - [Unsubscribe](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#unsubscribe)
    - [OnEvent](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#onevent)
  - [Network issues](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#network-issues)
  - [Example: WebRTC in loopback](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#example-webrtc-in-loopback)
  - [Creating a custom Kurento Client](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#creating-a-custom-kurento-client)
    - [Kurento Module Creator](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#kurento-module-creator)



Kurento Media Server is controlled by means of an JSON-RPC API, implemented in terms of the **Kurento Protocol** specification as described in this document, based on [WebSocket](https://doc-kurento.readthedocs.io/en/latest/glossary.html#term-WebSocket) and [JSON-RPC](https://doc-kurento.readthedocs.io/en/latest/glossary.html#term-JSON-RPC).

+ __JSON_RPC__: JSON형태의 Remote Procedure Call 프로토콜임

----------------------------

## [JSON-RPC message format](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id3)

### [Request](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id4)

An *RPC call* is represented by sending a *request* message to a server. The *request* message has the following members:

- **jsonrpc**: A string specifying the version of the JSON-RPC protocol. It must be `2.0`.

  jsonrpc:JSON-RPC프로토콜의 버전 2.0이여야한다.

  

- **id**: A unique identifier established by the client that contains a string or number. The server must reply with the same value in the *response* message. This member is used to correlate the context between both messages.

  문자열 또는 숫자를 포함하는 클라이언트가 설정한 고유 식별자, 서버는 응답 메시지에서 동일한 값으로 응답해야한다. id는 두 메시지 간의 컨텍스트를 연관시키는데 사용된다.

  

- **method**: A string containing the name of the method to be invoked.

  호출할 메서드의 이름이 포함된 문자열

  

- **params**: A structured value that holds the parameter values to be used during the invocation of the method.

  메소드 호출에서 사용될 파라미터로 구조화 된 값

### [Successful Response](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id5)

When an *RPC call* is made, the server replies with a *response* message. In case of a successful response, the *response* message will contain the following members:

- **jsonrpc**: A string specifying the version of the JSON-RPC protocol. It must be `2.0`.

- **id**: Must match the value of the *id* member in the *request* message.

  요청메시지의 id 값과 일치해야함

- **result**: Its value is determined by the method invoked on the server.

- In case the connection is rejected, the response includes a message with a *rejected* attribute containing a message with a *code* and *message* attributes with the reason why the session was not accepted, and no *sessionId* is defined.

  연결이 거부된 경우 응답메시지에는 코드와  왜 세션이 수락되지 않았는지가 포함되고

  sessionId가 정의되지 않는다.

  

  성공 응답 예시

  ```json
  {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "value": "442352747",
      "sessionId": "c93e5bf0-4fd0-4888-9411-765ff5d89b93"
    }
  }
  ```

  

  에러 응답 예시(세션아이디가 없고, 코드와 메시지가 포함되어있다)

  ```json
  {
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
      "code": 33,
      "message": "Invalid parameter format"
    }
  }
  ```

  



## [Kurento API over JSON-RPC](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id7)

Kurento Media Server exposes a full fledged API to let applications process media in several ways. To allow this rich API, Kurento Clients require full-duplex communications between client and server. For this reason, the Kurento Protocol is based on the [WebSocket](https://doc-kurento.readthedocs.io/en/latest/glossary.html#term-WebSocket) transport.



kurento clients는 클라이언트와 서버와의 전이중 통신을 필요로한다.

이러한 이유로 Kurento 프로토콜은 WebSocket 전송을 기반으로 한다.



Before issuing commands, the Kurento Client requires establishing a WebSocket connection with Kurento Media Server to this URL: `ws://hostname:port/kurento`.

Kurento Client와 KMS간에 WebSocket 연결이 이루어져야 한다.





Once the WebSocket has been established, the Kurento Protocol offers different types of request/response messages:

웹소켓 연결이 이루어지면 Kurento 프로토콜은 아래와 같은 요청/응답 메시지를 제공한다.

- **ping**: Keep-alive method between client and Kurento Media Server.

  클라이언트와 KMS의 연결 확인 방법

  응답으로는 pong이 온다.

  

- **create**: Creates a new media object, i.e. a Media Pipeline, an Endpoint, or any other Media Element.

  미디어 파이트라인, Endpoint 등 미디어 객체를 생성한다. 

  

- **describe**: Retrieves an already existing object.

  존재하는 객체를 검색 - 응답으로는 해당 객체의 타입 등이 포함

  

- **invoke**: Calls a method on an existing object.

  생생되어있는 객체에 함수를 호출한다.

  

- **subscribe**: Subscribes to some specific event, to receive notifications when it gets emitted by a media object.

  미디어 객체에서 발생하는 알림을 받기 위해 특정 이벤트를 등록한다.

  

- **unsubscribe**: Removes an existing subscription to an event.

  subscribe 한걸 제거한다.

  

- **release**: Marks a media object for garbage collection and release of the resources used by it.

  garbage collection의 대상이 되게 등록함

  

The Kurento Protocol allows that Kurento Media Server sends requests to clients:

- **onEvent**: This request is sent from Kurento Media server to subscribed clients when an event occurs.

  Kurento Server에서 특정 이벤트가 발생함을 알리기 위해 onEvent라는 요청메시지를 보낸다.

----------------------

## [Network issues](https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id16)

Resources handled by KMS are high-consuming. For this reason, KMS implements a garbage collector.

A Media Element is collected when the client is disconnected longer than 4 minutes. After that time, these media elements are disposed automatically. Therefore, the WebSocket connection between client and KMS should be active at all times. In case of a temporary network disconnection, KMS implements a mechanism that allows the client to reconnect.



KMS에 의해 다뤄지는 자원들은 소모량이 많다. 따라서 KMS는 gc를 구현하였다.

KMS에 존재하는 미디어 객체는 해당 객체의 클라이언트가 4분 이상 연결이 되지 않으면 없어지게 된다.



일시적인 network의 disconnection인 경우 KMS는 클라이언트에게 reconnect를 제공한다.

즉 4분안에 미디어 개체가 소멸되지 않았으면 클라이언트는 reconnect가 가능함



```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "connect",
  "params": {
    "sessionId": "4f5255d5-5695-4e1c-aa2b-722e82db5260"
  }
}
```



재연결이 된 경우

```json
  "jsonrpc": "2.0",
  "id": 10,
  "result": {
    "sessionId": "4f5255d5-5695-4e1c-aa2b-722e82db5260"
  }
}
```

재연결 실패한경우

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "error": {
    "code": 40007,
    "message": "Invalid session",
    "data": {
      "type": "INVALID_SESSION"
    }
  }
}
```

----------------------------------------------



[더 자세히 알아보기]((https://doc-kurento.readthedocs.io/en/latest/features/kurento_protocol.html#id2))

