# git branch

### 브랜치란?

프로젝트 기준 코드인 main 브랜치로부터 독립적인 작업공간을 만들어주는 기능

여러 개발자가 서로 다른 버전의 코드를 만들 때 서로의 작업에 영향을 주고받지 않기 위해 필요함

$ git status : 현재 파일 상태 파악 하기

$ git log --pretty=online --graph: 현재 브랜치의 상태 파악

이 때, `HEAD -> 브랜치 이름` 이라고 나오는데,HEAD는 현재 브랜치를 가리키는 포인터이며, 브랜치는 브랜치에 담긴 커밋 중 가장 마지막 커밋을 가리킨다. 지금의 HEAD가 가리키는 커밋은 바로 다음 커밋의 부모가 된다. 단순하게 생각하면 HEAD는 *현재 브랜치 마지막 커밋의 스냅샷*이다.



### 브랜치 생성하기

1. 깃허브 원격 저장소에서 생성 후, 지역 저장소로 가져오기

   - 깃허브에서 원격 저장소 생성하기

     ![](./github.png)

   - 지역 저장소로 가져오기

     1. git remote update : 지역 저장소에 원격 저장소의 상태를 업데이트 한다

     2. git branch -a : 지역 저장소와 원격 저장소의 브랜치 정보를 함께 보여준다

        ++ git branch -l : 지역 저장소의 브랜치 정보를 보여줌

        ++ git brach -r : 원격 저장소의 브랜치 정보를 보여줌

        ++ git branch -v : 지역 저장소의 브랜치 정볼를 최신 커밋 내역과 함께 보여줌

     3. git branch checkout -t < 브랜치 명> : 원격 저장소에서 생성한 브랜치를 지역 저장소의 작업 브랜치로 설정

        ++ git checkout : 사용할 브랜치를 지정한다 

        ++ git checkout -b: 브랜치를 생성하고 사용할 브랜치로 지정한다 

        ++ git checkout -t : 원격 저장소에서 생성한 브랜치를 지역 저장소에서 사용할 브랜치로 지정함

2. 지역 저장소에서 깃을 통해 브랜치 생성하기
   1. git branch -l : 현재 작업 중인 브랜치를 확인한다
   2. git checkout main : 작업 브랜치를 main 브랜치로 변경한다
   3. git branch < 새로운 브랜치 명> : 새로운 브랜치 생성
   4. git checkout < 새로운 브랜치 명> : 새로운 브랜치를 작업 브랜치로 변경
   5. git push origin <새로운 브랜치 명> : 새로운 브랜치를 원격 저장소에 반영



### 브랜치 삭제하기

- git branch -d < 브랜치 명>: 지역 저장소의 브랜치 삭제
- git push origin -d < 브랜치명>: 원격 저장소의 브랜치 삭제



### 브랜치 병합하기

1. git add . (브랜치에서 활동 중)

2. git commit -m "Change Something"

3. git checkout main

4. git merge < 브랜치 명 >

   충돌이 안 생기면 여기서 끝 

   충돌이 생기면 파일 수정 후 다시 add, commit 

**브랜치1에서 git checkout 브랜치2를 실행하면 1에서 2로 합치겠는 말임!**

### HEAD 옮기기 (상대 참조)

- 한번에 한 커밋 위로 움직이는 `^` (ex. git checkout main^)
- 한번에 여러 커밋 위로 올라가는 `~<num>` (ex. git chechout HEAD~4)