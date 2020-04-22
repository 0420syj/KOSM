package com.kosm.test6.repository;

import java.util.List;
import java.util.Optional;

import com.kosm.test6.model.OpenSource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenSourceRepository extends JpaRepository<OpenSource, Long> {

//	List<OpenSource> findByLibirary();
    //Optional<Achievo> findbycvecode(String cvecode);

	List<OpenSource> findBylibirary(String libirary);
}