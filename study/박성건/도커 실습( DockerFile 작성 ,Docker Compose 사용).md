# 도커 실습( DockerFile 작성 ,Docker Compose 사용)

## 1. 실습을 하기 위해 도커를 설치



**-** 참고 - https://docs.docker.com/engine/install/ubuntu/

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

   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null	
   ```



#### Install Docker Engine

1. Update the `apt` package index, and install the *latest version* of Docker Engine and containerd, or go to the next step to install a specific version:

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

2. 특정 버전의 docker-compose 설치

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

3. 권한 설정

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

   

![image-20220209134028624](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209134028624.png)



-----------------------------------



## 2. DockerFile을 작성하여 기본 MySql 이미지를 커스텀마이징하기

DockerHub에서 제공하는 mysql 이미지를 가지고 커스텀마이징 이미지로 만드는 방법은 

크게 2가지 정도가 있다.



1. 기본 이미지로 컨테이너를 띄운 후 직접 커스텀마이징 하고 docker commit 명령어로 이미지를 만든다.
2. DockerFile을 작성하여 특정 이미지를 설정으로 커스텀마이징하여 docker build 명령어로 이미지를 만든다.





#### Dockerfile 작성하여 이미지 생성하기

Dockerfile을 아래와 같이 작성

```dockerfile
#기본 이미지를 mysql 5.7버전을 사용하겠다.
FROM mysql:5.7 


#서버의 환경변수를 활용하는게 더 좋다.
 #유저 아이디
ENV MYSQL_USER mysql_user
# 유저 패스워드
ENV MYSQL_PASSWORD mysql_password 
# 루트 패스워드
ENV MYSQL_ROOT_PASSWORD mysql_root_password 
#데이터 베이스 이름
ENV MYSQL_DATABASE mydatabase 

# 현재 pwd의 scripts 디렉터리에 있는 파일들을 도커에 copy하는 작업
# 이미지를 생성할 때 돌릴 sql을 넣으면 됨 여기서는 생략
# COPY ./scripts/ /docker-entrypoint-initdb.d/
```



Dockerfile을 작성하였으면

해당 디렉터리에 가서  아래 명령어를 실행한다.

Dockerfile의 이름이 Dockerfile이면 경로는 . 즉 pwd이면 됨

```
sudo docker build -t database_img .
```

이 명령어를 실행하면 database_img라는 이미지가 생성된다.

이미지 목록 확인하는 명령어

```
sudo docker images
```



![image-20220209140603064](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209140603064.png)

--------------------------------

#### 생성된 이미지 실행하기

-d : 백그라운드

-p : 포트지정 외부와 내부(도커)를 연결하는 포트를 지정 mysql의 기본포트 3306을 연결해줬음

```
sudo docker run --name mySql -p 3306:3306 -d database_img
```

![image-20220209141509040](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209141509040.png)

컨테이너가 돌아간것을 확인 할 수 있다.



아래 명령어로 컨테이너에 들어가보자

```
sudo docker exec -it mySql /bin/bash
```



아래 명령어로 mysql 명령어의 위치도 확인할 수 있다.

```
which mysql
```

![image-20220209144110934](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209144110934.png)



아래 명령어를 입력하고 도커파일에서 설정한 비밀번호로 데이터 베이스에 접근할 수 있다.

```
mysql -u root -p
```





![image-20220209144724830](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209144724830.png)







### 백엔드를 올릴 컨테이너(우분투, 자바, gradle) 이미지로 만들기

아래 명령어로 우분투 이미지를 받아옴

```
sudo docker pull ubuntu:20.04
```



![image-20220209145801830](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209145801830.png)



아래 명령어를 통해 컨테이너를 시작하고 컨테이너의 /bin/bash도 실행

-it : 이 두 옵션은 컨테이너를 종료하지 않은체로, 터미널의 입력을 계속해서 컨테이너로 전달하기 위해서 사용

```
sudo docker run -it --name backend-ubuntu -d ubuntu:20.04
```



아래 명령어로 컨테이너에 접속

```
sudo docker exec -it backend-ubuntu /bin/bash
```



apt-get update 명령어를 먼저 실행

```
apt-get update
```



나중에 컨테이너의 워킹디렉터리가 될 곳, 즉 백엔드 소스코드가 올라오고 gradle build와 gradle bootRun이 실행이 되는 곳

```
mkdir backend
```





자바 스프링 gradle 프로젝트이기 때문에 자바랑 gradle을 설치해줘야함

```
 apt-get install openjdk-11-jdk
```



그래들을 최신 버전으로 받기 위해 아래 순서로 실행

```
apt-get install software-properties-common
add-apt-repository ppa:cwchien/gradle
apt-get update
apt-get install gradle
```

현재 gradle 7.3버전

![image-20220209155858485](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209155858485.png)



이제 서버 셋팅이 되었으니 이미지로 구워야한다.



exit로 원래 터미널로 돌아가서

sudo docker ps 를 통해 실행 중인 우분투(gradle, java) 깔아놓은 컨테이너가 정상적으로 실행중인지 확인한다.

```bash
sudo docker ps
```

![image-20220209164100025](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209164100025.png)

해당 컨테이너를 커밋하기 위해 아래 명령어를 실행한다.

```
sudo docker commit [컨테이너] [저장 할 이미지 이름]
```

아래 명령어로 이미지가 잘 생성되었는지 확인한다.

```
sudo docker images 
```



기존의 돌아가던 컨테이너를 중지시키고 삭제한 후 

생성한 이미지를 컨테이너로 만든 후 자바랑 gradle이 아직 정상적으로 잘 설치되어 있는지 확인한다.



```bash
sudo docker stop [컨테이너 식별번호 또는 이름]
sudo docker rm [컨테이너 식별번호 또는 이름]
```



아래 명령어로 실행

```
sudo docker run -it --name [컨테이너 이름] -d [생성한 이미지 이름]
```

아래 명령어로 컨테이너에 접속

```bash
sudo docker exec -it [컨테이너 이름] /bin/bash
```



아래 명령어로 버전을 확인하여 이미지가 제대로 생성 됐는 지 확인

```
java --version
gradle -v
```

![image-20220209164829000](../../AppData/Roaming/Typora/typora-user-images/image-20220209164829000.png)



-------------------------

### 백엔드 서버 컨테이너에 소스코드를 올리고 빌드 및 실행



백엔드 서버에 올릴 소스코드를 컨테이너에 넣고

Dockerfile을 통해 세부 명령어와 설정을 한다.



Dockerfile은 현재 백엔드 프로젝트의 루트디렉터리에 있다.



Docker 컴포즈를 이용하여 컨테이너를 띄울 때

COPY를 통해 소스코드를 옮기고

해당 gradle project를 실행 할 수 있는 명령어를 

실행하면 끝이다.



```
#스프링 프로젝트를 올리기 위해 자바랑 gradle설치 해놓은 img

FROM backend-ubuntu_img

WORKDIR /backend

#여기에 스프링 프로젝트를 올리고 gradle 명령어로 실행시킴
COPY . /backend/

CMD ["/usr/bin/gradle","build"]
CMD ["/usr/bin/gradle","bootRun"]

```



일단 docker-compose를 사용하지 않고 

위에서 했던 방법으로 Dockerfile만을 통해 이미지를 생성하고 컨테이너를 실행하여

직접 gradle build와 gradle bootRun을 해볼것이다.



먼저 아래 명령어를 통해 spring_img를 만든다.

```
sudo docker build -t spring_img .
```



spring_img가 정상적으로 생성되었으면

아래 컨테이너로 실행시키고 CMD에 있는 명령어가 동작하는지 확인한다.

-d: 옵션을 제거하여 포그라운드에서 CMD에 적은 명령어가 잘 실행되는지 볼 수 있다.

```
sudo docker run -it --name spring spring_img
```



실행 결과는 오류가 뜬다..



이유는 현재 mySql컨테이너와 같은 네트워크로 묶어주지 않았기 때문에

jdbc연결 과정에서 오류가 나기 때문이다.



---------------------------------------------

### Docker-compose로 mySql과 백엔드 스프링 컨테이너 같은 네트워크로 묶고 실행

![image-20220209203956265](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209203956265.png)

현재 database에 Dockerfile과 homeland디렉터리에 Dockerfile이 있다.



이 2가지를 같은 네트워크로 묶고 docker-compose up으로 한번에 실행시키기 위해서는

docker-compose.yml 작성이 필요하다.



```
version: '3'
services:
 database:
 #Dockerfile이 있는 위치
 build: ./database
 
 #포트포워딩을 위한 연결 mySql의 기본 포트
 ports: - "3306:3306"
 
 #backend부분
 backend:
  build: ./backend
  #디렉터리를 연결
  volumes: - ./homeland:/backend
  ports: - "8080:8080"
  environment: - DBHOST=database
  
```



아래 명령어 실행

```
sudo docker-compose up -d
```



컨테이너를 살펴보면 잘 떠있다.

```
sudo docker ps
```

![image-20220209212222028](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209212222028.png)



특정 컨테이너의 로그를 확인하는 방법

```bash
sudo docker logs -f [컨테이너]
```





그러면 8080으로 들어온 요청은 컨테이너에서 돌아가는 스프링서버가 처리한다.



여기서 중요한 점은 jdbc를 연결 할 때

application.properties의 설정 중

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/블라블라
```

이렇게 하면 안된다.

아래와 같이 localhost가 아니라 컨테이너 명이 들어가야 db와 연결이 된다.

아니면 공인 ip주소나 도메인주소로도 3306으로 포트 포워딩 돼서 연결되긴 하지만

보통 데이터베이스 서버는 내부망안에 있기 때문에 공인아이피나 도메인으로 외부에서 오는 접근은 차단한다.

```
jdbc:mysql://s06p12c202_database_1:3306/블라블라
```



![image-20220209225050362](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220209225050362.png)

백엔드와 데이터베이스까지 docker-compose로 띄워봤다.
