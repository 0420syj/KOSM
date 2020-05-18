package com.kosm.test6.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "projects")
public class Project{ 
    @Id
    private Long id;

    private String name;

    private String link;

    private String cveDate;
    
    private String version;

    private String releaseDate;

    private String Graph;

    private String category;



    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_projects",
    joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"), 
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<Member> members = new HashSet<>();
}

/* joinColumns = {@JoinColumn(name = "project_id", 
                                      referencedColumnName = "id"),
                    @JoinColumn( name = "Date",                               
                                      referencedColumnName = "cveDate", 
                                      nullable = true)},
                                       joinColumns = @JoinColumn(name = "project_id"),*/
                                      