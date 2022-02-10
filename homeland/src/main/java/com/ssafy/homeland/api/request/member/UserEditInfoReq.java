package com.ssafy.homeland.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEditPutRequest")
public class UserEditInfoReq {
    @ApiModelProperty(name="유저 Nickname", example="your_nickname")
    String nickname;
    @ApiModelProperty(name="유저 Email", example="ssafy@gmail.com")
    String email;
}
