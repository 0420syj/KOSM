package com.kosm.test6.repository;

import java.util.Optional;

import com.kosm.test6.model.OpenSource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenSourceRepository extends JpaRepository<OpenSource, String> {
    //Optional<Achievo> findbycvecode(String cvecode);
}