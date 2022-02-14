# Deployment

​	

	## 1. OpenVidu 서버 배포

```bqsh
cd /opt	
```

```bash
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```



### /opt/openvidu/.env 파일 설정

OpenVidu 서버 도메인과 Secret을 설정하고

https를 위한 인증서 타입을 설정한다.

인증서 타입은 letsencrypt로 하였음

```
# Domain name. If you do not have one, the public IP of the machine.
# For example: 198.51.100.1, or openvidu.example.com
DOMAIN_OR_PUBLIC_IP=i6c202.p.ssafy.io

# OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
OPENVIDU_SECRET=HOMELAND

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=letsencrypt

# If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
LETSENCRYPT_EMAIL=qs2720@gmail.com
```



### /opt/openvidu/docker-compose.override.yml 설정



---------------------------------

## 2. 프론트엔드 배포

































## 3. 백엔트 배포

