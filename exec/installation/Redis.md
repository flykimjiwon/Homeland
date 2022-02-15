## Redis 설치



```bash
sudo apt-get update
sudo apt-get install redis
```

### 버전확인

![image-20220214152511644](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220214152511644.png)





redis 포트를 6380으로 변경

```
sudo vi /etc/redis/redis.conf
```



재실행

```
sudo /etc/init.d/redis-server restart
```



정상적으로 포트바뀌었는지 확인

```
sudo netstat -antp | grep 6380
```

![image-20220214152848331](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220214152848331.png)





#### 포트 변경후 redis-cli 아래 명령어 처럼 하면 된다.

```
redis-cli -p 6380
```

![image-20220214153058275](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220214153058275.png)