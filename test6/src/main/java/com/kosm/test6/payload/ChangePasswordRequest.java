package com.kosm.test6.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    private String email;
    private String beforePassword;
    private String newPassword;

    public ChangePasswordRequest(String email, String beforePassword, String newPassword){
        this.email = email;
        this.beforePassword = beforePassword;
        this.newPassword = newPassword;
    }
}