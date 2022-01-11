### git branch공부



- 브랜치 만들고 이동하기

`git branch [브랜치명]`

새로운 브랜치생성

`git checkout [브랜치명]`

해당 브랜치로 이동



- 참고

![image-20220111111139461](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111111139461.png)



### Git merge

![image-20220111111243095](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111111243095.png)

`git merge bugfix `라고치면

![image-20220111111317519](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111111317519.png)

이렇게된다 별표가 있는쪽으로 가서 새로 커밋이됨

---

`git checkout bugFix`

`git merge main`

이라고하게되면



![image-20220111111421402](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111111421402.png)



이렇게된다. 별표의 위치가 중요하다.

전부 같은부모를 공유하는형태 색이 같아진다는거 같은작업 공유

main과 bugFix가 전부 이동하게된다.



---

![image-20220111114937990](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111114937990.png)

`git rebase main`

이쁘게 같은 작업으로 합쳐주는 역할을 한다.

bugFix 브랜치의 작업 내용이 main의  한 줄의 커밋으로 보이게 됨



![image-20220111123631908](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111123631908.png)

그리고 이상태에서 `git rebase bugFix`라고하게되면

![image-20220111123650408](git%EB%B8%8C%EB%9E%9C%EC%B9%98%EA%B3%B5%EB%B6%80.assets/image-20220111123650408.png)

아래와 같이 변경된다.

즉 그쪽으로 향하게 하는거다.