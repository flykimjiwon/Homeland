

# 구축환경

## AWS EC2 t2.micro Ubuntu 20 LTS

----------------------------------

기타설치

netstat, ifconfig같은 명령어 쓰기 위해 설치

```
sudo apt-get update && sudo apt-get install net-tools 
```



GnuPG 설치 (같은 환경이면 설치 되어있음),Local에서 kms를 설치할 때 필요하다고 함

```
sudo apt-get update && sudo apt-get install --no-install-recommends \
    gnupg
```

+ GnuPG: GNU Privacy Guard.



# Kurento 설치하기



[Kurento Docs]](https://doc-kurento.readthedocs.io/en/latest/)     
Kurento의 공식 Documents에는 설치, 튜토리얼, 설정, Troubleshooting Issues,FAQ 등의 User Documentation을 제공한다.      

### 먼저 Installation 가이드를 보면 3가지 방식의 설치 가이드를 제공한다.

1. AWS
2. Docker image
3. Local Installation    

3가지 공통으로 설치하여 서버를 실행하기 전에 WebRTC는 기본적으로 HTTPS프로토콜을 이용하기 때문에 SSL등을 통해 HTTPS 설정을 해줘야 한다.     
-----------------------------------------------



## 1.AWS

AWS에서 CloudFormation 스택 생성에서 스택 생성을 누른 후 자체 탬플릿 또는 샘플 템플릿을 통해 빠르게 환경을 구성할 수 있다.



![image-20220111175352348](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220111175352348.png)

![image-20220111175406279](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220111175406279.png)

![image-20220111175532475](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220111175532475.png)

![image-20220111175605133](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220111175605133.png)



프리티어에서는 t2.micro 타입을 무료로 이용할 수 있는데

기본 Instance Type은 t2.large를 추천하고 있다.



## 2. Docker image



### 2-1 Docker 설치

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

  

## 2-2 도커 이미지 설치 및 실행

```
sudo docker pull kurento/kurento-media-server:latest

sudo docker run -d --network host kurento/kurento-media-server:latest
```

![image-20220112164046907](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112164046907.png)

여기까지 완료후 STUN/TURN 서버를 설치 및 설정 후 다시

kurento를 설정하면 된다.



# STUN/TURN 서버 설치 및 설정



## 1. Coturn 설치

```bash
sudo apt-get install --no-install-recommends --yes coturn
```



## 2. Coturn 설정

### /etc/default/coturn 파일을 아래와 같이 수정



![image-20220112164937057](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112164937057.png)

+ 권한이 없기 때문에 sudo로 수정해야함

```
sudo vi /etc/default/coturn
```

### /etc/turnserver.conf 도 아래와 같이 수정

<>에는 알맞은 주소 기입

```
listening-port=3478
tls-listening-port=5349
listening-ip=<EC2의 private ipv4 주소>
relay-ip=<EC2의 프라이빗 ip 주소>
external-ip=<EC2 의 퍼블릭 ipv4 주소>/<EC2의 프라이빗 IPv4 주소>
fingerprint
lt-cred-mech
user=myuser:mypassword   --> 이따 kurento서버 설정에서 사용함 (바꿔도 됨)
realm=myrealm 
log-file=/var/log/turn.log
simple.log
```



### Coturn 재시작

-------------------------------------------------------------

# Kurento 설정

Kurento 미디어 서버가 STUN/TURN 서버와 함께 동작하기 위해 위치를 지정해야함



### Kurento Docker 컨테이너 접속



![image-20220112172753079](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112172753079.png)



### Kurento WebRtcEndpoint.ini 수정

```bash
vi /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini
```

명령어로 아래와 같이 수정 <>에는 알맞은 주소 기입 

myuser와 mypassword는 이전에 STUN서버에서 설정한 내용과 같아야한다.

```text
stunServerAddress=<퍼블릭 주소>
stunServerPort=3478
turnURL=myuser:mypassword@<퍼블릭주소>:3478?transport=udp
```

exit로 빠져나와서 KMS컨테이너 재실행

```bash
exit
sudo docker restart 컨테이너ID
```



여기 까지 완료했으면

```bash
sudo netstat -antp
```

명령어로



![image-20220112173708183](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112173708183.png)



8888(KMS) 포트와 3478(STUN) 포트가 열린것을 볼 수 있다.





