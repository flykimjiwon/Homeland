package com.ssafy.homeland.api.response.member;

import com.ssafy.homeland.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserInfoRes {
    Long id;
    String userId;
    String email;
    String nickname;
    LocalDateTime createdAt;

    public UserInfoRes(User entity) {
        this.userId = entity.getUserId();
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.createdAt = entity.getCreatedAt();
        this.nickname = entity.getNickname();
    }
}
