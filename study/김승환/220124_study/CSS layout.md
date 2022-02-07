## CSS layout

* 웹 페이지에 포함되는 요소들을 취합하고 그것들이 어느 위치에 놓일 것인지를 제어
* 기술
  * Display
  * Position
  * Float
  * Flexbox
  * Bootstrap Grid System



### Float

* 한 요소(element)가 정상 흐름(normal flow)으로부터 빠져 텍스트 및 인라인(inline) 요소가
  그 주위를 감싸 요소의 좌,우측을 따라 배치되어야 함을 지정
* 본래는 이미지를 한쪽으로 띄우고 텍스트를 둘러싸는 레이아웃을 위해 도입
* 더 나아가 이미지가 아닌 다른 요소들에도 적용해 웹 사이트 전체 레이아웃을 만드는데까지 발전

#### 속성

* none : 기본값
* left : 요소를 왼쪽으로 띄움
* right : 요소를 오른쪽으로 띄움

### .clearfix::after

* ::after : 가상요소(의사요소)
  선택한 요소의 맨 마지막 자식으로 가상요소
  하나를 생성합니다. (막을 하나 칩니다, 선을 하나 긋습니다.)

* code

  ``` css
      .clearfix::after {
        content: "";
        display: block;
        clear: both;
      }
  ```

* 작성위치 : float된 부모 요소에 작성

