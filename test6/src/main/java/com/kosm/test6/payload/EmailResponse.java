package com.kosm.test6.payload;

import javax.validation.constraints.NotBlank;

public class EmailResponse {
    @NotBlank
    private String Email;

    public String getEmail() {
        return Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

   
}