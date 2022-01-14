# kurento Tutorial-Group-Call

# [1. 튜토리얼 설치 및 HTTPS 설정](https://lab.ssafy.com/s06-webmobile1-sub1/S06P11C202/-/blob/master/study/backend/%EB%B0%95%EC%84%B1%EA%B1%B4/kurento%20Tutorial-Hello-World.md)

__위 링크에서 튜토리얼 설치 및 HTTPS 설정 방법 참고__

__application.properties__ 위치가 다름

현재 워킹 디렉터리의 위치가 group-call 프로젝트 최상위 디렉터리라면

```bash
find . | grep application
```

명령어로 찾으면 된다. (__target__하위에 있는 파일 아님!)





hello-world 튜토리얼과 마찬가지로 프로젝트 최상위 디렉터리로 이동후 아래 명령어 실행

```bash
mvn -U clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dkms.url=ws://<KMS_HOST>:8888/kurento"![image-20220113175841285](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113175841285.png)
```



아래와 같이 실행되면 성공

![image-20220113175857432](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113175857432.png)

ROOM 1에 노트북으로 2,데스크탑으로 2 접속한 모습

![image-20220113175949718](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113175949718.png)



![image-20220113180400222](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220113180400222.png)

방이 생성되면 ROOM 1 has created

참여자가 방에 참여 요청을 보내면 ROOM2 adding participant UserName

그리고 방에 참가자가 들어 올 때 마다 유저들간 connecting을 하는 것을 볼 수 있다.

------------------------------------------------

## 소스코드 분석 예정



