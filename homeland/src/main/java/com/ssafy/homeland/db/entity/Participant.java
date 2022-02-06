package com.ssafy.homeland.db.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Participant {
    String nickName;

    public Participant(String nickName) {
        this.nickName = nickName;
    }
}
