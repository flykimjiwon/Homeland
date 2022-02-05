## HTML

#### Hyper Text Markup Language

<hr>

Hyper : 텍스트 등의 정보가 동일 선상에 있는 것이 아니라 다중으로 연결 되어 있는 상태

Hyper text : 참조(하이퍼링크)를 통해 한 문서에서 다른 문서로 즉시 접근할 수 있는 텍스트

Hyper text가 쓰인 기술들 중 가장 중요한 2가지 : Http / html

Markup : 텍스트에 역할을 부여하는 것! (제목, 본문)

<hr>

즉 HTML이란 웹 페이지를 작성하기 위한 (구조를 잡기 위한) 언어
웹 컨텐츠의 '의미'와 '구조'를 정의

<hr>



## HTML 기본 구조

최 상단에 `<html>` 태그로 감싸져 있으며 그 안에 `<head>` 와 `<body>` 로 나뉨

#### `<head>`

문서 제목, 문자코드(인코딩)와 같이 해당 문서 정보를 담고 있으며,
브라우저에 나타나지 않는다.



#### `<body>`

브라우저 화면에 나타나는 정보로 실제 내용에 해당된다.



#### DOM(Document Object Model) 트리

각각의 태그를 하나하나의 객체로 접근할 수 있는 구조
Web페이지의 객체 지향 구조



#### 요소(element)

HTML의 요소는 태그와 내용(contents)으로 구성되어 있다.



#### 속성과 속성값

태그별로 사용할 수 있는 속성은 다르다.
속성을 통해 태그의 부가적인 정보를 설정할 수 있음
요소의 시작 태그에 작성하며 보통 이름과 값이 하나의 쌍으로 존재
태그와 상관없이 사용 가능한 속성(HTML Global Attribute)들도 있음



#### 시맨틱 태그

의미론적 요소를 담은 태그의 등장
(header, nav, article, aside, section, footer, h1, table)

Non semantic 요소 : div, span



#### form ★

서버에 데이터를 보내주는 태그
action : 보낸 데이터가 도착할 URI
method : http method 중 어떤걸 택할지

input 태그 안에 작성하는 데이터가 form태그의 action에 적힌 경로로 넘어감

<hr>

##### label & id

```html	
<label for='name'>이름을 기재해주세요.</label><br>
<input type="text" id="name" name="name" autofocus>
```

label의 내용(이름을~~)을 클릭하면 자동으로 input입력창으로 커서가 옮겨감
이는 label의 for에 적힌 name과 input의 id에 적힌 name으로 찾아감!

autofocus는 웹페이지가 열리면 자동으로 커서가 올라가도록 하는 기능

<hr>

##### 드랍다운 (select)

```html
<label for="region">지역을 선택해주세요.</label><br>
<select name="region" id="region" required>
    <option value="">선택</option>
    <option value="서울">서울</option>
    <option value="대전">대전</option>
    <option value="광주">광주</option>
    <option value="강원" disabled>강원</option>
</select>
```

required는 해당 항목을 선택하지 않으면 제출이 불가능하도록 하는 기능
disabled는 선택창에는 나타나지만 선택하지 못하도록 하는 기능

<hr>

##### radio

```html
<input type="radio" name="body-heat" id="normal" value="normal" checked>
<label for="normal">37도 미만</label><br>
<input type="radio" name="body-heat" id="warning" value="warning">
<label for="warning">37도 이상</label>

```

checked는 해당 버튼이 체크되어 있는 상태로 시작

<hr>

##### submit

```html
<input type="submit" value="제출">
```

type이 submit인 input이 반드시 존재해야 form태그에 적힌 action으로 데이터를 넘길 수 있음

```html

```

<hr>

## CSS

Cascading Style Sheets
스타일, 레이아웃 등을 통해 문서(HTML)를 표시하는 방법을 지정하는 언어

```css
h1 {color: blue;
	font-size: 15px;
	}
```

선택자 : h1
속성 : color, font-size
값 : blue, 15px
선언 : color: blue;, font-size: 15px; (속성 + 값)

cf)전체 선택자 : *
ex)  * {
			color: red;
			}

문서 전체 텍스트 색 : 빨간색

### CSS 정의 방법

1. 인라인(inline)
2. 내부 참조(embedding) -`<style>`
3. 외부 참조(link file) - 분리된 CSS파일



### class와 id

class는 같은 클래스를 여러번 사용 가능 .class
id는 하나의 값은 문서에서 한 번만 사용 #id



<hr>



## 선택자 우선순위

!important > 인라인 > id > class >  속성 > 요소(tag)



## CSS 상속

상속 되는 것 : Text 관련 요소 - font, color, text-align, opacity, visibility

안되는 것 : Box model - width, height, margin, padding, bording, box-sizing, display
					position = position, top, right, left, bottom, z-index



## 크기 단위

* em : 바로 위, 부모 요소에 대한 영향을 받음
  배수 단위
  부모가 10px고 2em이면 20px
* rem : 최상위 요소(html)의 사이즈를 기준으로 배수 단위
  html의 기본px = 16px



rgba (a = 투명도)



## 결합자

```html
자손 결합자 : div 아래 모든 span
div span {
	color : red;
}

자식 결합자 : div 바로 아래 위치한 span
div > span {
	color : red;
}

일반 형제 결합자 : div 뒤에 위치하는 모든 span
div ~ span {
	color : red;
}

인접 형제 결합자 : 형제 요소 중 바로 뒤에 위치하는 span만
div + span {
	color : red;
}
```




<hr>

## Box model

content - padding - border - margin

상하좌우
상하 / 좌우
상/좌우/하
상/우/하/좌

auto : 가운데

```html
.box-sizing {
	box-sizing : border-box;
}
```

위 코드는 크기가 content기준이 아니라 border기준임
따라서 padding, border 등 수정해도 박스 크기는 변하지 않음
(원래 기본 값은 content가 기준임)

보통 작업을 시작할 때 제일 위에

```css
* {
    box-sizing: border-box;
}
```

선언하고 시작



## 마진상쇄

block A의 top과 block B의 bottom에 적용된 각각의 margin이 둘 다 값이 계산 되지 않고
둘 중 큰 마진 값으로 적용된다.
(50 + 70 = 70)



<hr>



## block vs inline

* display : block
  * 줄 바꿈이 일어나는 요소
  * 화면 크기 전체의 가로 폭을 차지
  * 블록 레벨 요소 안에 인라인 레벨 요소가 들어갈 수 있음
  * div / ul, ol, li / p / hr / form / 
* display : inline
  * 줄 바꿈이 일어나지 않는 행의 일부 요소
  * content 너비 만큼의 가로 폭을 차지한다
  * 따라서 width, height, margin-top, margin-bottom 지정 불가능
  * 상하 여백은 line-height로 지정한다
  * span / a / img / input, label / b, em, i, strong
* display : inline-block
  * inline처럼 한 줄에 표시 가능하며,
  * block처럼 width, height, margin 속성 모두 지정 가능
* display : none
  * 해당 요소를 화면에 표시하지 않는다. (차지하는 공간도 사라짐)
  * visibility : hidden과의 차이점은 hidden은 해당 요소를 화면에 표시하지
    않지만 공간은 여전히 차지하고 있음



따라서 block을 수평정렬하려면
margin-right: auto;
margin-left: auto;

inline을 수평정렬하려면
text-align: center;

<hr>



## CSS position

* static : 모든 태그의 기본 값
  * 일반적으로 좌측 상단부터 시작
    * 부모 요소 내에서배치될 때는 부모 요소의 위치를 기준으로 배치
* relative : 상대위치
  * 자기 자신의 static 위치를 기준으로 이동
  * 레이아웃에서 요소가 차지하는 공간은 static일 때와 같음
* absolute : 절대 위치
  * 요소를 일반적인 문서 흐름에서 제거한 후 레이아웃에 공간을 차지하지 않음
  * **static이 아닌** 가장 가까이 있는 부모/조상 요소를 기준으로 이동 (없는 경우 body)
* fixed : 고정위치
  * 요소를 일반적인 문서 흐름에서 제거한 후 레이아웃에 공간을 차지하지 않음
  * 부모요소와 관계 없이 viewport를 기준으로 이동
  * 스크롤 시에도 항상 같은 곳에 위치