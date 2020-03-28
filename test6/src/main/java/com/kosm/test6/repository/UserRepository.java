package com.kosm.test6.repository;

import java.util.List;
import java.util.Optional;

import com.kosm.test6.model.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
    
    Optional<Member> findByUsernameOrEmail(String username, String email);

    List<Member> findByIdIn(List<Long> userIds);


    Optional<Member> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}