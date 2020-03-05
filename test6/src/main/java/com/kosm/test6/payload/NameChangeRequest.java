package com.kosm.test6.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NameChangeRequest {
    private String email;
    private String username;


    public NameChangeRequest(String email, String username) {
        this.email = email;
        this.username = username;
    }
}