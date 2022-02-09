package com.ssafy.homeland.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserCheckPasswordRequest")
public class UserCheckPwReq {
    @ApiModelProperty(name="체크할 Password", example="my_password")
    String password;
}
