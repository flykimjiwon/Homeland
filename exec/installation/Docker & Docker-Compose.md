## Docker & Docker-Compose 설치하기

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