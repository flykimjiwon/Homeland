* git branch `<name>` : 새로운 브랜치 생성

* commit

* git switch <name> : HEAD를 name이란 브랜치로 옮기기

* HEAD란 현재 작업하고 있는 브랜치를 나타냄

* switch를 통해 마스터로 HEAD 옮기고
  git merge `<name>`을 통해 name이랑 브랜치를 마스터 브랜치에 통합하기



* 현재 HEAD가 main 브랜치에 있고 C3이 main 브랜치의 최근 커밋이라면

* git commit ` <commit name> ` 은 브랜치로 헤드를 옮기는 것이 아니라
  커밋으로 헤드를 옮기는 것
  즉 헤드와 브랜치를 분리!!

* git switch C4^  는 C4라는 커밋의 한 부모 커밋으로 헤드를 옮기는 것
  git switch C4~4 는 C4라는 커밋에서 네 단계 위의 부모 커밋으로 헤드를 옮기는 것



* main 브랜치를 HEAD에서 세번 뒤로 강제로 옮기기
  `git branch -f main HEAD~3`

  HEAD를 위로 4칸 올리기
  `git switch HEAD~4`

  main 브랜치를 C6 커밋으로 옮기기
  `git branch -f main C6`



* Git 작업 되돌리기

  1. Git reset

     git reset은 애초에 커밋하지 않은 것처럼 예전 커밋으로 브랜치를 옮기는 것
     각자의 컴퓨터에서 작업하는 로컬 브랜치의 경우 리셋을 쓰기 용이함
     하지만 '히스토리를 고쳐쓴다' 는 점 때문에 다른 사람이 작업하는
     리모트 브랜치에는 쓸 수 없음

  2. Git revert

     git revert는 변경분을 되돌리고 이를 다른 사람들과 공유하기 위해 씀

  한 커밋 되돌리기
  `git reset HEAD~1`

  revert
  `git revert HEAD`

