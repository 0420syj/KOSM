package com.kosm.test6.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.kosm.test6.model.Project;
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

    @GetMapping("/project/category")
    public Map<String, List<ProjectListResponse>> findAllCategory() {
        Map<String, List<ProjectListResponse>> target = new HashMap<>();
        List<Project> prjList;

        prjList = projectRepository.findAllByCategory("office_software");
        target.put("office_software", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("website_software");
        target.put("website_software", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("communication_application");
        target.put("communication_application", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("image_media");
        target.put("image_media", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("development_tool");
        target.put("development_tool", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("database");
        target.put("database", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        prjList = projectRepository.findAllByCategory("others");
        target.put("others", prjList.stream().map(project -> new ProjectListResponse(project)).collect(Collectors.toList()));

        return target;
    }
    
}
    