package com.kosm.test6.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.kosm.test6.model.audit.BaseTimeEntity;

@Getter
@NoArgsConstructor
@Entity
public class Boards extends BaseTimeEntity {

    @Id         // 해당 테이블의 PK 필드 나타냄
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // PK의 생성 규칙을 나타냄
    private Long id;

    @Column(length = 500, nullable = false)             // 테이블의 칼럼을 나타냄. 굳이 선언하지 않더라도 해당 클래스의 필드는 모드 칼럼이 됨
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    private String status;

    @Builder                // 해당 클래스의 빌더 패턴 클래스 생성
    public Boards(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
        this.status = "처리중";
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }



}