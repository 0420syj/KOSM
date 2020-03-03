package com.kosm.test6.payload;

import javax.validation.constraints.NotBlank;

public class EmailResponse {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        this.email = Email;
    }

   
}