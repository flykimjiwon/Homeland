# Kurento Media Server KMS공부   
 What's Kurento?       
Kurento is a WebRTC media server and a set of client APIs making simple the development of advanced video applications for WWW and smartphone platforms. Kurento Media Server features include group communications, transcoding, recording, mixing, broadcasting and routing of audiovisual flows.      

------------------
WebRTC는 기본적으로 P2P연결을 통해 웹 브라우저와 브라우저 또는 모바일 애플리케이션간의 RTC기능을 제공하는 프로토콜과 APIs이다.   
별도의 소프트웨어나 플러그인을 설치할 필요 없고 P2P간의 video, image data(text 등) communications가 가능하다.    

그렇다면 N대 N의 화상채팅 또는 연결이 필요할 경우 N개의 클라이언트는 N-1개의 다른 클라이언트와 연결을 맺는 Mess구조가 되는데     
이로인해 클라이언트의 부담이 증가한다.     

또한 1:N 처럼 1의 스트리머와 N명의 뷰어가 있을 때는 이 처럼 Mess구조의 연결 방식을 적합하지 않다.   

따라서 클라이언트 사이에 Media Server를 둘 수 있다.

Kurento도 이런 미디어 서버 중 하나이다.    

![image](/uploads/8e30c5b229995d022ecc5cd2ca4bd036/image.png)   

위의 그림에서 알 수 있듯이 일반적인 media 서버는 transcoding, group communications, recording 등의 기능을 제공하지만    
Kurento는 mixing and Blending, Computer vision, Augumented Reality, broadcasting 등의 추가적인 기능을 제공한다.   
또한 Kurento가 제공하는 미디어 서버 유형에 MCU와 SFU 를 지원하는데

## MCU(Mutipoint Control Unit)란?
+ 다대다 통신에서 여러 미디어 스트림을 하나의 스트림으로 만든 후 클라이언트에게 제공한다.      
- 서버의 부하가 SFU에 비해 높지만, 클라이언트는 SFU에 비해 더 적은 데이터로 스트림 서비스를 받을 수 있다.   

## SFU(Selective Fowording Unit)란?
+ 다대다 통신에서 여러 미디어 스트림을 하나로 만들기 위한 디코딩, 인코딩 작업 없이 클라이언트에게 제공한다.
- 서버의 부하가 MCU에 비해 낮지만, 클라이언트는 MCU보다 더 많은 데이터를 수신해야한다.

![image](/uploads/9595767e499dd71129fdf14c0989bb35/image.png)

------------------------------------------

[Kurento Docs]](https://doc-kurento.readthedocs.io/en/latest/)     
Kurento의 공식 Documents에는 설치, 튜토리얼, 설정, Troubleshooting Issues,FAQ 등의 User Documentation을 제공한다.      

### 먼저 Installation 가이드를 보면 3가지 방식의 설치 가이드를 제공한다.

1. AWS
2. Docker image
3. Local Installation    

3가지 공통으로 설치하여 서버를 실행하기 전에 WebRTC는 기본적으로 HTTPS프로토콜을 이용하기 때문에 SSL등을 통해 HTTPS 설정을 해줘야 한다.     
-----------------------------------------------

