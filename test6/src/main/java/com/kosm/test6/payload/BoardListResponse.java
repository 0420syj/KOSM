package com.kosm.test6.payload;

import java.time.LocalDateTime;
import com.kosm.test6.model.Boards;
import lombok.Getter;

@Getter
public class BoardListResponse {
    private Long id;
    private String title;
    private String author;
    private String status;
    private LocalDateTime createdDate;

    public BoardListResponse(Boards entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.status = entity.getStatus();
        this.createdDate = entity.getCreatedDate();
    }
}