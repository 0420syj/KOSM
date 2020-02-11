/*package com.kosm.test6.payload;

import com.kosm.test6.model.Boards;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardSaveRequest {
    private String title;
    private String content;
    private String author;

    @Builder
    public BoardSaveRequest(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Boards toEntity(){
        return Boards.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();
    }
}
*/