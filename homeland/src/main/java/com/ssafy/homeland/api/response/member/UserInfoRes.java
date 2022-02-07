package com.ssafy.homeland.api.response.member;

import com.ssafy.homeland.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("UserInfoGetResponse")
public class UserInfoRes {
    @ApiModelProperty(name="seq", example="1")
    Long id;
    @ApiModelProperty(name="유저 ID", example="ssafy_web")
    String userId;
    @ApiModelProperty(name="유저 이메일", example="ssafy@gamil.com")
    String email;
    @ApiModelProperty(name="유저 닉네임", example="사랑스러운 호랑이")
    String nickname;
    @ApiModelProperty(name="유저 생성날짜", example="2022-02-04 14:07:48.206444")
    LocalDateTime createdAt;

    public UserInfoRes(User entity) {
        this.userId = entity.getUserId();
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.createdAt = entity.getCreatedAt();
        this.nickname = entity.getNickname();
    }
}
