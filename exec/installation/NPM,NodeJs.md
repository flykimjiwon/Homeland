## NPM,Node JS 설치



### 1. NVM (Node Version Management) 설치

```
sudo apt-get update
sudo apt-get install wget
sudo wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

```
nvm install 16.13.2
```

![image-20220214145951584](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220214145951584.png)





#### ! Node js랑 NPM 버전이 다른 경우 프로젝트가 안될 수 있습니다.







