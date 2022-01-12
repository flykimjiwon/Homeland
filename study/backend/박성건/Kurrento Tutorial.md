# Kurrento Tutorial-Hello-World

참고 - https://doc-kurento.readthedocs.io/en/latest/tutorials/java/tutorial-helloworld.html



아래 명령어를 통해 설치 진행

```
git clone https://github.com/Kurento/kurento-tutorial-java.git
cd kurento-tutorial-java/kurento-hello-world
git checkout master
mvn -U clean spring-boot:run \
    -Dspring-boot.run.jvmArguments="-Dkms.url=ws://<KMS_HOST>:8888/kurento"
```

* KMS_HOST에는 KMS가 돌아가는 서버의 주소

* 서버가 돌아가는 곳이 같다면 local호스트로 해도 된다.(실행 위치 주의!)

  ```
  mvn -U clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dkms.url=ws://<KMS_HOST>:8888/kurento"
  ```

maven 설치

```bash
sudo apt install maven	
```

--------------------------------------------------------------------------------------------------------------------------------------------------------



##  *** 튜토리얼을 실행하기 전에 HTTPS설정하는거 체크 ***

Web browsers require using *HTTPS* to enable WebRTC, so the web server must use SSL and a certificate file. For instructions, check [Configure a Java server to use HTTPS](https://doc-kurento.readthedocs.io/en/latest/features/security.html#features-security-java-https).



아래는 docs와 다른 방법으로 진행



HTTPS를 활성화 하기위해서는 몇가지 과정이 필요



1. __Self-Signed 인증서 생성__

   ​	PKCS12 키스토어 파일(*.12)을 src.main/resources/keystore 경로에 생성

   ​	아래와 같은 방법으로 디렉터리 생성 및 이동(초기 위치에 따라 다르긴 함)

   ```bash
   cd src/main/resources
   mkdir keystore && cd keystore
   ```

   * /kurento-tutorial-java/kurento-hello-world/src/main/resources/keystore로 이동
   
   ![image-20220112175602164](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112175602164.png)

​		인증서를 생성하기 위해 아래 명령어를 이용

```bash
keytool -genkeypair -alias ssafy -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore ssafy.p12 -validity 3650
```

​		이때 비밀번호는 다시 사용되기 때문에 알아야한다.



![image-20220112175958709](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112175958709.png)



​		ls 명령어로 *.p12 파일이 정상적으로 생성되었는지 확인

![image-20220112180058443](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112180058443.png)



 2. __application.properties 설정__

    Spring Application이 HTTPS로 동작하기 위해 application.properties 파일을 아래와 같이 수정

    
    
    ![image-20220112180507677](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112180507677.png)

+ 기존의 내용은 주석 처리하고 

  ```
  server.port=8443
  server.http.port=8080
  server.ssl.enabled=true
  server.ssl.key-store-type=PKCS12
  server.ssl.key-store=classpath:keystore/ssafy.p12
  server.ssl.key-store-password=<키 생성할 때 비밀번호>
  server.ssl.key-alias=ssafy
  trust.store=classpath:keystore/ssafy.p12
  trust.store.password=<키 생성할 때 비밀번호>
  ```

  키 생성할때 설정과 맞춰 내용을 수정

  

  프로젝트의 application.properties 파일을 찾기 위해서 아래와 같은 명령어 사용

  ```bash
  find . | grep application
  ```

  ![image-20220112180934236](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112180934236.png)

  

  수정 후 저장

### HTTPS 설정 완료

-------------------------------





## Tutorial 프로젝트 실행

먼저  hello-world 프로젝트로 이동

![image-20220112181311508](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112181311508.png)

+ 아래 명령어 실행(주소 알맞게 넣은 후)

```
mvn -U clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dkms.url=ws://<KMS_HOST>:8888/kurento"
```



아래와 같은 그림이 뜨면 90퍼 성공

![image-20220112181522933](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112181522933.png)



아래와 같은 그림이 뜨면 고급을 눌러 링크를 클릭해 이동하면 끝

![image-20220112181812966](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112181812966.png)

![image-20220112181925495](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112181925495.png)



![image-20220112182043098](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112182043098.png)

![image-20220112183738662](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112183738662.png)

이 구조대로라면 KMS에 미디어를 보내고 다시 KMS로 부터 미디어를 받아야 하는데

기본 프리티어 t2.micro 서버 성능 때문인지 버퍼 이미지만 계속 보인다.

추후 로컬과 aws 인스턴스 성능을 올리고 다시 시도할 예정



## Hello-World Tutorial 끝!!

-----------------------------------







