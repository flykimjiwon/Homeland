package com.ssafy.homeland.api.request.notice;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticePostRequest")
public class NoticePostReq {
    @ApiModelProperty(name="공지사항 제목", example="this is title of notice")
    String title;

    @ApiModelProperty(name="공지사항 내용", example="this is content of notice")
    String content;
}
