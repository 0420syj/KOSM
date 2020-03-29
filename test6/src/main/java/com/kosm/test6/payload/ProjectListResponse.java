package com.kosm.test6.payload;

import com.kosm.test6.model.Project;

import lombok.Getter;

@Getter
public class ProjectListResponse {
    private Long id;
    private String name;
    private String link;
    

    public ProjectListResponse(Project entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.link=entity.getLink();
    }

    public ProjectListResponse(Long id, String name,String link) {
        this.id = id;
        this.name = name;
        this.link=link;
    }
}