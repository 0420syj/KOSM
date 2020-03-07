package com.kosm.test6.payload;

import com.kosm.test6.model.Project;

import lombok.Getter;

@Getter
public class ProjectListResponse {
    private Long id;
    private String name;
    

    public ProjectListResponse(Project entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }

    public ProjectListResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}