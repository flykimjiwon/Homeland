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

  ```
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

  ```
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

  

- **create**: Creates a new media object, i.e. a Media Pipeline, an Endpoint, or any other Media Element.

- **describe**: Retrieves an already existing object.

- **invoke**: Calls a method on an existing object.

- **subscribe**: Subscribes to some specific event, to receive notifications when it gets emitted by a media object.

- **unsubscribe**: Removes an existing subscription to an event.

- **release**: Marks a media object for garbage collection and release of the resources used by it.

The Kurento Protocol allows that Kurento Media Server sends requests to clients:

- **onEvent**: This request is sent from Kurento Media server to subscribed clients when an event occurs.



