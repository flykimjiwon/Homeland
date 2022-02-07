## VScode 로 AWS 원격 접속

* Like 깃헙에 들어가 로그인하고 레포 찾아서
  폴더를 끌어서 올리는게 귀찮으니
  git bash 터미널에서 바로 명령어로 치는것

1. vscode에 remote development 설치

2. vscode 왼쪽 창에 생긴 원격탐색기 클릭

3. 가장 초기에 Container라고 되어 있는 부분을
   SSH Target으로 변경

4. C: > Users > User > .ssh 폴더에 있는 
   config파일(없으면 만들기)에

   ```
   Host i6c202.p.ssafy.io
     HostName i6c202.p.ssafy.io
     User ubuntu
     ForwardAgent yes
     IdentityFile .ssh/I6C202T.pem
   ```

   다음과 같이 입력 후 폴더 안에 pem 파일 생성(다운)하기

5. SSH TARGETS에 생긴 io파일을 열어서
   Linux 클릭하면 끝!

