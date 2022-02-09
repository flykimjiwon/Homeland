# Jenkins 도커로 실행 및 gitLab 연결

## 환경

### AWS Ubuntu 20 TLS, t2.medium



## 1. Docker 설치

- 참고 - https://docs.docker.com/engine/install/ubuntu/

#### Set up the repository

1. Update the `apt` package index and install packages to allow `apt` to use a repository over HTTPS

   ```bash
    sudo apt-get update
    
    sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

   

2. Add Docker’s official GPG key:

   ```bash
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

   

3. Use the following command to set up the **stable** repository. To add the **nightly** or **test** repository, add the word `nightly` or `test` (or both) after the word `stable` in the commands below. [Learn about **nightly** and **test** channels](https://docs.docker.com/engine/install/).

   ```
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

   -------------------------------------

#### Install Docker Engine

 1. Update the `apt` package index, and install the *latest version* of Docker Engine and containerd, or go to the next step to install a specific version:

    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```



+ 특정 버전의 docker-compose 설치

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

![image-20220112162512840](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112162512840.png)



+ 권한설정

  ```bash
  sudo chmod +x /usr/local/bin/docker-compose
  ```

  

## 1-2 도커 jenkins 이미지 설치 및 실행

아래 명령어를 통해 jenkins 이미지 설치 및 컨테이너를 실행한다.

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /srv/jenkins/home:/var/jenkins_home -p 8080:8080 -p 50000:50000 -p 8081:8081 --name=jenkins jenkins/jenkins
```

아래 이미지와 같이 출력이 된다.

![image-20220120124829723](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120124829723.png)

아래 명령어를 통해 디렉터리 소유를 바꿔준다(uuid와 guid가 1000인데 컨테이너 내부의 jenkins의 기본 uuid,guid 가 1000임)

```
sudo chown -R 1000:1000 /srv/jenkins/home/
```

다시 컨테이너 삭제 후 재실행을 한다.

```bash
docker rm jenkins
```

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /srv/jenkins/home:/var/jenkins_home -p 8080:8080 -p 50000:50000 -p 8081:8081 --name=jenkins jenkins/jenkins
```

이렇게 하면 정상적으로 실행이 되면서 아래와 같이 초기 비밀번호가 같이 나온다.(복사해둠)

![image-20220120125650108](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120125650108.png)

크롬 같은 브라우저로 8080 접속하면 아래와 같은 화면이 나온다.

복사해둔 초기 비밀번호를 넣고 continue

![image-20220120125810208](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120125810208.png)



플러그인 추천해준걸 설치한다.(Git, Gradle 등 여러개 포함되어있음)

![image-20220120125909640](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120125909640.png)



Admin 계정 설정



![image-20220120130350278](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120130350278.png)



설정하고 넘기다 보면 아래 같은 홈 화면이 뜬다.(jenkins 설치는 끝)

![image-20220120130451462](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120130451462.png)

----------------------------------------------------

## GitLab과 연결



## 1. gitLab Plugin 설치

![image-20220120131515000](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120131515000.png)

![image-20220120131600753](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120131600753.png)



설치완료

![image-20220120131659858](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120131659858.png)

## 2. 새로운 Item 생성(관리할 프로젝트 생성)

![image-20220120131933777](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120131933777.png)

![image-20220120132132016](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120132132016.png)

![image-20220120132437785](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120132437785.png)

생성이 되면 클릭해서 들어감



![image-20220120132543593](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120132543593.png)

구성 클릭



소스 코드 관리 보면 git Repository랑 연결할 수 있는데

GitLab이나 GitHub이나 SSH, Http 둘다 연결 가능하다.

SSH연결은 포트가 허용되어있고 공개키를 생성해서 

GitLab이나 GitHub에서 키 등록을 해주고 사용하면 된다.

하지만 (싸피 깃랩은 SSH 연결이 차단되어있는것같아서 Https로 연결했다.)

![image-20220120132716685](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120132716685.png)



연결이 되면 빨간 에러 글씨가 사라진다.



아래 그림처럼 빌드유발(트리거 설정), 빌드환경, 빌드를 설정할 수 있고

일단 빌드할때 정상적으로 연결이 되었고 gibLab에서 소스코드를 가져오는지 확인해보기 위해 "jenkins test"를 출력하는 명령어를 넣어놨다.

![image-20220120133426465](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120133426465.png)

![image-20220120133617628](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120133617628.png)

Build Now를 누르면

아래 History에 빌드가 진행되는 것을 볼 수 있다.

![image-20220120133859227](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120133859227.png)

해당 내역에 들어가면 콘솔 OutPut을 볼 수 있다.

![image-20220120134059926](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120134059926.png)

빌드하기 전에 클론하고, 빌드가 끝나면 설정해 놓았던 Excute shell이 실행되면서

echo "jenkins test"가 출력된것을 볼 수 있다.



프로젝트가 정상적으로 clone 된것을 확인하고 싶다면 아래 명령어를 통해 컨테이너 내부로 들어간다.

```bash
sudo docker exec -it -u 0 jenkins bash
```

아래 명령어로 이동하면 생성했던 item이 보인다.

```
cd /var/jenkins_home/workspace
```



![image-20220120134428917](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120134428917.png)

![image-20220120134934521](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120165645719.png)



jenkins-test-app --> jenkins에서 만든 아이템

springmvc--> 내가 gitLab에 만들어놓은 스프링부트 프로젝트

맨 아래 붉은 박스를 보면 build 디렉터리가 없음-->build과정을 설정하지 않았기 때문

요약하자면 gitLab이랑 연결되어서 프로젝트를 자동으로 받아오는것 까지 설정 완료



-------------------------

## Gradle로 빌드하기

Gradle로 빌드하기 전에 먼저 Global Tool Configuration에서 gradle 설정을 해줘야한다.

![image-20220120135304593](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120135304593.png)



Invoke Gralde script를 간단하게 작성하면 clean->build->bootRun 순서이다.

![image-20220120135539876](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120135539876.png)

![image-20220120135746498](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120135746498.png)

빌드 Console OutPut을 보면 task가 단계별로 실행된다.



빌드 후 스프링 부트를 실행한 화면이다.

하지만 Port 번호를 Jenkins와 같이 설정해놔서 충돌이 발생한다.

Jenkins의 포트를 바꾸던가 프로젝트의 포트를 바꾸면 정상 실행이 된다.

![image-20220120135844326](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120135844326.png)





내 프로젝트의 포트 번호를 8080에서 8081로 변경한후 gitLab에 push하고 

빌드를 실행한 결과(빌드 버튼 한번만 누르면 됨 편하긴 함, 트리거를 설정안해서 빌드 버튼을 수동으로 누름)





![image-20220120140455306](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120140455306.png)

정상 실행된것을 확인 할 수 있다.



빌드 버튼을 누르면 gitLab에서 변경부분이 발견되면 다시 받아서 빌드하기 때문에 수정된 내용이 즉각 반영되었다.



도커 jenkins 컨테이너 내부에서 8081로 띄어져 있는것을 확인 할 수 있다.

컨테이너를 실행할 때 -p 8080:8080 -p 50000:50000 이외에도 -p 8081:8081을 넣어줘서

http://서버주소:8081 

하면 포트포워딩이 되어서 컨테이너 내부에 스프링부트로 띄워진 웹서버에도 접근이 가능하다.

![image-20220120141021355](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120141021355.png)



도커 jenkins 내부에서 빌드되어 실행된 스프링 부트 기반 WAS

![image-20220120143637323](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220120143637323.png)





---------------------------------

# 추가 공부 사항

## jenkins로 자동 빌드 트리거 설정

## 쉘 스트립트 공부해서 자동화 등 



