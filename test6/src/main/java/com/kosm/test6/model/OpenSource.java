package com.kosm.test6.model;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "OpenSource")
public class OpenSource {
    
	//@Id
  //  @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String code;

    private String libirary;

    @Column(length = 10000)
    private String summary ;

    private String date;

    private String score;

    @Builder
    public OpenSource(String code, String Libirary,String summary, String date, String score) {
        this.code=code;
        this.libirary=Libirary;
        this.summary =summary;
        this.date=date;
        this.score=score;
	}

	

}