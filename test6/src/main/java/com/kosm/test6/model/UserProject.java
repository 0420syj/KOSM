package com.kosm.test6.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_projects")
public class UserProject{ 
    @Id
    private Long project_id;

    private Long user_id;

    //private Set<Member> members = new HashSet<>();
}