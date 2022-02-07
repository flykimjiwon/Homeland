package com.ssafy.homeland.api.request.room;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 참가자 API ([POST] /api/v1/room/join) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ParticipantPostRequest")
public class ParticipantPostReq {
    @ApiModelProperty(name="참가자 닉네임", example="rudy")
    String nickName;
    @ApiModelProperty(name = "참가자 홈페이지 로그인 id",example = "rudy0103")
    String userId;
    @ApiModelProperty(name = "참가자 오픈비두 connection id",example = "con_d12m1lr")
    String connectionId;

}
