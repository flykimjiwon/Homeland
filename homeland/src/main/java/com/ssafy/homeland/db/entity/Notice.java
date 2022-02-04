package com.ssafy.homeland.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.PrePersist;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Notice extends BaseEntity {

    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

    @Builder
    public Notice(String title, String content, LocalDateTime createdAt, LocalDateTime updateAt) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }

//    @PrePersist
//    public void createdAt() {
//        this.createdAt = LocalDateTime.now();
//    }
//
}
