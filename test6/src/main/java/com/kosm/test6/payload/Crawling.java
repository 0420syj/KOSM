package com.kosm.test6.payload;

import javax.validation.constraints.NotBlank;

public class Crawling {
    @NotBlank
    private String Url;

    public String getUrl() {
        return Url;
    }

    public void setUrl(String Url) {
        this.Url = Url;
    }

   
}