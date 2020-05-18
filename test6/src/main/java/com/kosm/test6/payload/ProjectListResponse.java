package com.kosm.test6.payload;

import com.kosm.test6.model.Project;

import lombok.Getter;

@Getter
public class ProjectListResponse {
    private Long id;
    private String name;
    private String date;
    private String date2;

    public ProjectListResponse(Project entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        String[] arr1=entity.getCveDate().split(";");
        this.date=arr1[0];
        this.date2=entity.getReleaseDate();
    }

    public ProjectListResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}