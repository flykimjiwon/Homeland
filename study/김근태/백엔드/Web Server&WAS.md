# Web Server 과 WAS(Web Application Server)
정적컨텐츠제공 **VS** 동적컨텐츠적용(DB조회 및, 다양한로직 처리를 요구하는 동적 컨텐츠 - 요청에따라 바뀔수있는 컨텐츠)
아파치, MS IIS, nginx **VS** 톰캣, 제우스

WAS = Web Server(요청을 컨테이너에게, 결과를 클라이언트에게 제공) + Web Container(JSP, Servlet 등 동적프로세싱)

## WAS 와 Web Server를 같이 사용했을 때의 장점
### 책임 분할을 통한 서버 부하 방지
- 정적 컨텐츠는 Web Server
  동적 컨텐츠는 WAS가 담당

### 여러 대의 WAS 로드밸런싱
- WAS가 처리해야하는 요청을 여러 WAS가 나누어서 처리할 수 있도록 Web Server가 로드밸런싱 역할 수행

### 여러 대의 WAS Health check
- Health check란 서버에 주기적으로 http 요청을 보내 서버의 상태를 확인(ex 특정 url 요청에 200응답이 오는지?)
- Interval : health check를 통해 서버상태를 확인하는 요청을 날리는 주기 (default : 5초)
- Fails : 아래의 경우 3회 연속 실패하면 서버가 비정상이라고 인지 (default : 1초)
- Passes : 서버가 다시 복구되어 요청이 2변 연속 성공하면 서버가 정상으로 인지 (default : 1회)
		ex) location / {
			proxy_pass http://backend;
			health_check interval=10 fails=3 passes=2;
		    }
		*여러대의 WAS 사용중 하나의 WAS가 health check를 통과하지못한다면(이상이 생긴다면) 계속 그 WAS에 요청을 보내는것이 아니라
		WAS에 대한 연결을 자동으로 차단하도록 설정 passes를 통과한다면 다시 연결

	
### 보안
- 리버스 프록시를 통해 실제 서버를 외부에 노출하지 않을 수 있다.

### 종합
- 서비스의 확작성, 안정성을 고려한다면 앞단에 Web Server를 두는것이 유리

출처 : [[10분 테코톡] 알리의 Web Server vs WAS](https://www.youtube.com/watch?v=mcnJcjbfjrs&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)
