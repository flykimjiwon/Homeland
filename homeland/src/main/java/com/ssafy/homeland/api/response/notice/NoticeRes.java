package com.ssafy.homeland.api.response.notice;

import com.ssafy.homeland.db.entity.Notice;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NoticeRes {
    Long id;
    String title;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    String content;

    public NoticeRes(Notice entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdateAt();
        this.content = entity.getContent();
    }
}
