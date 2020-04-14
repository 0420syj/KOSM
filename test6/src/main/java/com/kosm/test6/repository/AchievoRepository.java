package com.kosm.test6.repository;

import java.util.Optional;

import com.kosm.test6.model.Achievo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievoRepository extends JpaRepository<Achievo, String> {
    //Optional<Achievo> findbycvecode(String cvecode);
}