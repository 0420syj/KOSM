package com.kosm.test6.payload;

import javax.validation.constraints.*;

public class HashRequest {

    @NotBlank
    @Size(min = 6, max = 100)
    private String hash;

   

    public String getHash() {
        return hash;
    }

    public void getHash(String hash) {
        this.hash = hash;
    }

}