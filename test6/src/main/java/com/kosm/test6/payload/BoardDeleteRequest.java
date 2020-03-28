package com.kosm.test6.payload;

import lombok.Getter;

@Getter
public class BoardDeleteRequest {
    private Long id;
    

    public BoardDeleteRequest(Long id) {
        this.id = id;
    }
}