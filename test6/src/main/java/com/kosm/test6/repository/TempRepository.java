package com.kosm.test6.repository;

import java.util.List;
import java.util.Optional;

import com.kosm.test6.model.TempMember;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempRepository extends JpaRepository<TempMember, Long> {
    TempMember findByEmail(String email);

    TempMember findByHash(String hash);
    
    Optional<TempMember> findByUsernameOrEmail(String username, String email);

    List<TempMember> findByIdIn(List<Long> userIds);

    Optional<TempMember> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}