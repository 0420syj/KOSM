package com.kosm.test6.payload;

import java.time.LocalDateTime;

import com.kosm.test6.model.Boards;

import lombok.Getter;

@Getter
public class BoardResponse {

    private Long id;
    private String title;
    private String content;
    private String author;
    private String status;
    private LocalDateTime createdDate;

    public BoardResponse(Boards entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.status = entity.getStatus();
        this.createdDate = entity.getCreatedDate();
    }
}