package com.ssafy.homeland.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Participant {
    String nickName;
    String userId;//우리 홈페이지 가입한 아이디 //널이 아니면 회원, 널이면 비회원
    String roomId;
    String connectionId;

}
