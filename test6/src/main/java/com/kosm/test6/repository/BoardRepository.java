package com.kosm.test6.repository;

import java.util.List;

import com.kosm.test6.model.Boards;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface BoardRepository extends JpaRepository<Boards,Long> {

    @Query(value = "SELECT p FROM boards p ORDER BY p.id DESC", nativeQuery = true)
    List<Boards> findAllDesc();
}