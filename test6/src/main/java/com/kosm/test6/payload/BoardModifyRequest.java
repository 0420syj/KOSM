package com.kosm.test6.payload;

import lombok.Getter;

@Getter
public class BoardModifyRequest {
    private Long id;
    private String status;

    public BoardModifyRequest(Long id, String status) {
        this.id = id;
        this.status = status;
    }
}