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
@Table(name = "Achievo")
public class Achievo {
    
	//@Id
  //  @GeneratedValue(strategy = GenerationType.IDENTITY)
   // private Long id;
    @Id
    private String code;
    @Column(length = 10000)
    private String summary ;

    private String date;

    private String score;

    @Builder
    public Achievo(String code, String summary, String date, String score) {
        this.code=code;
        this.summary =summary;
        this.date=date;
        this.score=score;
	}

	

}