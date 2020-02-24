package com.kosm.test6.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.kosm.test6.payload.ProjectListResponse;
import com.kosm.test6.repository.ProjectRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ProjectController {

    private final ProjectRepository projectRepository;

    @GetMapping("/project/list")
    public List<ProjectListResponse> findAllProjects() {
        return projectRepository.findAll().stream().map(project -> new ProjectListResponse(project))
                .collect(Collectors.toList());
    }

    
}
    