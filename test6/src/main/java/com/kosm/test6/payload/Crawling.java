package com.kosm.test6.payload;

import javax.validation.constraints.NotBlank;

public class Crawling {
    @NotBlank
    private String Url;
    @NotBlank
    private String Name;

    public String getUrl() {
        return Url;
    }

    public void setUrl(String Url) {
        this.Url = Url;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

   
}