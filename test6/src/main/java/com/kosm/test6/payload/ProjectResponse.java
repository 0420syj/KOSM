package com.kosm.test6.payload;

import lombok.Getter;

@Getter
public class ProjectResponse {
    private Long project_id;
    private Long user_id;



    public ProjectResponse(Long project_id, Long user_id){
        this.project_id = project_id;
        this.user_id = user_id;
    }
}