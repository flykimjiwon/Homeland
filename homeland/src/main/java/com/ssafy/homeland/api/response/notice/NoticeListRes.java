package com.ssafy.homeland.api.response.notice;

import com.ssafy.homeland.db.entity.Notice;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("NoticeListGetResponse")
public class NoticeListRes {
    @ApiModelProperty(name="seq", example="1")
    Long id;

    @ApiModelProperty(name="공지사항 제목", example="this is notice title")
    String title;

    @ApiModelProperty(name="공지사항 생성 날짜", example="2022-02-04 14:07:48.206444")
    LocalDateTime createdAt;

    @ApiModelProperty(name="공지사항 수정 날짜", example="2022-02-05 09:12:44.135632")
    LocalDateTime updatedAt;

    public NoticeListRes(Notice entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdateAt();
    }
}


