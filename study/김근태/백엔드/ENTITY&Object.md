#개체(ENTITY)와 객체(Object)

## VO (Value Object)
값의 비교를 위해서 사용
equals(값 비교)와 hashCode(해쉬맵,해쉬셋 비교)를 오버라이드 해서 사용한다.

오버라이드 결과로 VO는 값이 동일하다면 같은객체라고본다
VO는 Immutable한 불변 객체로 사용된다
따라서 Setter는 존재하지않고 Getter만 존재한다
VO에는 lombok으로 @Data 어노테이션을 달아서는 안된다

Getter만 있을때 값을 어떻게 집어넣을 것인가?
생성할떄 생성자에 작성하면 된다.

## DTO (Data Transfer Object)
데이터 전송 객체
흔히 JSOn형태의 데이터를 통신을 위해 시리얼라이즈해서 쓰게되는것이 dto
컨트롤러에서 리턴할떄 바로 이 dto를 쓰게 된다.

## ENTITY
entity는 실제 DB Table과 매칭이 되는 클래스이다.
Service layer에서 사용하고 표현 계층의 로직을 가져서는 안된다
원칙적으로 Controller에서는 Entity를 Parameter로 받거나 리턴해서는 안된다.
Entity와 DTO 분리하는 이유는 Layer 별로 역할을 분리하고
Entity의 영속성을 지켜주기 위해서이다.
Controller에서 Param으로 Entity를 받을 경우 DB가 아닌 Client로부터 Entity가 영속성을 주입받게 된다.
Entity는 기본생성자가 필수, final클래스, enum, interface, inner 클래스에서는 사용할 수 없다.
저장할 필드에 final을 쓸수없다.


이론적으로는 DTO와 Entity를 분리하는 것이 맞지만 실무적으로 간단한 CRUD를 만들 떄 Entity를 그대로 리턴하기도 한다
DB테이블과 View에서 사용하는 객체가 완전히 동일하다면 매번 DTO를 만드는 로직이 낭비일 수도 있기 때문이다.
(그럼에도 불구하고 분리를 권장함)
