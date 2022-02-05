# Git Flow

## Git을 쓰는 이유?

개인플레이:

- 코드 관리/백업

팀플레이:

- 협업 workflow
- 커밋 컨벤션 통일
- 배포 자동화
- 코드 리뷰



채용공고에서 git을 요구?

Git 등의 분산 버전 관리 시스템 이용에 능숙한 분



## Git 구조 및 명령어

Repository:

- Local
- Remote

명령어:

Gitlab git cheat sheet

![git cheat sheet](https://miro.medium.com/max/2182/1*VAgB8SiA7DXo5FeGTjW3Jw.png)

자주 사용해보면서 익숙해지자



## Git branch

특정 커밋에 대한 참조(reference)

"하나의 커밋과 그 부모 커밋들을 포함하는 작업 내역"

브랜치를 많이 만들어도 메모리나 디스크 공간에 부담 없음!

=> 브랜치를 작은 단위로 잘게 나누는 것이 좋다.

- feature - develop - release - hotfix - main(master)
- release와 hotfix는 지금 당장 branch를 만들 필요는 없을 것 같다.



## 시작하기

```
git flow init
```



하지만 이 방식을 하면 코드리뷰를 할 수 없음!

수동으로 branch를 나누고 작업한 후 merge request로 병합하는 방식을 추천함.



## git commit 사전작업

gitlab 계정과 맞춰줘야 함!

전역(global) 설정

git config --global user.name [이름]

git config --global user.email [이메일]

git config -l



.gitignore 관리하기



## Git 기초 공부해보기

```
# 브랜치 생성하기
git branch [브랜치명]

# 새로운 브랜치로 바꾸기
git checkout [브랜치명]

# 병합하기(main에서)
git merge bugFix
git checkout bugFix
git merge main

# rebase를 이용한 병합
## bugFix에서 main으로
git rebase main

# HEAD 분리하기
git checkout C1

# 커밋 해시의 앞 네 자리만 사용해도 됨
## 상대참조
### 한 번에 한 커밋 위로: ^(캐럿 연산자)
### 한번에 여러 커밋 위로: ~<num>
git checkout main^ # main의 부모
git checkout main^^ # main의 조부모
git checkout HEAD^

# 브랜치 강제로 옮기기
git branch -f main HEAD~3 # main브랜치를 HEAD에서 3번 뒤로 옮김

# commit 되돌리기
git reset HEAD~1 # 헤드에서 한칸 뒤로 되돌리기, 로컬에서 혼자 할 경우
git revert HEAD # 새로운 커밋 복제해서 이동하는 개념(?), 여러 사람에게 수정사항 반영해줄 경우

# 체리픽
git cherry-pick <commit1> <commit2> ...
## 현재 위치(HEAD) 아래에 있는 일련의 커밋들에 대한 복사본을 만든다는 뜻(?)

# 원하는 커밋을 모를 때 => Interactive Rebase!
## rebase 명령어를 사용할 때 -i 옵션을 같이 사용한다는 뜻
## 리베이스의 목적지가 되는 곳 아래에 복사될 커밋들을 보여주는 UI(vim)를 띄워줌
### 적용할 커밋들의 순서를 UI를 통해 바꿀 수 있음(마우스 드래그 앤 드롭)
### 원하지 않는 커밋들을 뺄 수 있음. pick을 이용해 지정 가능
### 커밋을 squash할 수 있음. 커밋을 합할 수 있다는 뜻
git rebase -i HEAD~<num>
### 그러면 헤드를 기준으로 num 개수의 커밋들의 위치를 바꾸거나 뺄 수 있음

```





## Git 실습

```
git init

# git graph 플러그인을 설치하면 그래프를 보기 쉬워짐

# branch 생성
git branch develop

# branch 전환
git switch develop

# 첫번째 기능
echo "1. fgfjg" > readme.md
git commit -am "C1"

# 두번째 기능
echo "2. dfhasfe" >> readme.md
git commit -am "C2"

# 세번째 기능
echo "3. adfhawe" >> readme.md
git commit -am "C3"

# C1때 작업으로 이동하기
git checkout 264f(커밋 아이디 첫 네번째 자리까지)
echo "1.1 fae" >> readme.md
git commit -am "C1-B1"
echo "1.2 fadfae" >> readme.md
git commit -am "C1-B2"

# 버그픽스 관련 브랜치 만들기
git switch -c bugfix/1
git merge develop
# 작업 출력해보기
cat readme.md
# 파일 수정해서 conflict 해결하기
git add .
git commit -m "merge branch 'develop' into bugfix/1"

git switch develop
git merge --no-ff bugfix/1
# 두번째 기능을 체크아웃과 동시에 스위치
git switch -c feat/2
```



## 추가 학습

- pro git에서 pdf 다운로드받아서 학습

- git with d3

- 연습: learngitbranching.js.org

- 링크드인 Git 평가



## Git Wrap up

- 개발에 방해되지 않을 정도까지는 git 기본 개념/명령어 숙지
- Git branch를 사용한 코드관리의 흐름(flow) 이해
- 회사/팀별 상황에 맞는 git branch 전략 선택
- 팀 별 합의된 정책에 맞춰 일관된 Git 사용 노력 필요
- 궁금하거나 자주 마주하는 케이스에 대한 Git 사용법은 꼭 연습!



## Git 커밋 메시지 컨벤션

https://doublesprogramming.tistory.com/256

위 링크 참조!
