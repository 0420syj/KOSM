package com.kosm.test6.repository;

import java.util.List;
import java.util.Optional;

import com.kosm.test6.model.UserProject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
    List<UserProject> findByProject_id(Long userId);

}