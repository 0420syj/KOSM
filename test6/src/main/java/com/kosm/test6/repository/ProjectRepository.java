package com.kosm.test6.repository;

import java.util.List;
import java.util.Optional;

import com.kosm.test6.model.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByName(String projectName);

    List<Project> findAllByCategory(String projectCategory);
}


