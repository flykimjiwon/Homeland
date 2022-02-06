package com.ssafy.homeland.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id = null;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updateAt;

    @Builder
    public Notice(Long id, String title, String content, LocalDateTime createdAt, LocalDateTime updateAt) {

        this.id = id;
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
