package com.kosm.test6.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.kosm.test6.repository.ProjectRepository;
import com.kosm.test6.model.Member;
import com.kosm.test6.model.UserProject;
import com.kosm.test6.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

//import com.kosm.test6.payload.UserSummary;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.repository.UserProjectRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
//import com.kosm.test6.payload.UserSummary;
import java.util.List;
import java.util.Optional;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Document;

@Component
public class Scheduling {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    private UserProjectRepository userProjectRepository;// UserProject

    @Scheduled(fixedDelay = 100000) // 20珥?
    public void simplePrintln() throws MessagingException {
        List<UserProject> projects = userProjectRepository.findAll();
       // List<Member> members = userRepository.findAll();
        Member member;
        Optional<Member> optional;
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        for (int i= 0; i < projects.size(); i++) {
            optional = userRepository.findById((long) projects.get(i).getUser_id());
             member=optional.get();
             helper.setTo(member.getEmail());
             helper.setSubject("Testing from Spring Boot");
            
            String content ="This is a Kosm. Check your OpenSource News!!";
            helper.setText("<h1>Thank you for Reading!</h1>" +content, true);
            javaMailSender.send(msg);
            System.out.println("success");
       }
    }
    @Scheduled(fixedDelay = 100000) // 100초 //link들어가서 날짜 크롤링 모든프로젝트 날짜 크롤링조회;
    public void Monitoring_Project() throws MessagingException {
        List<Project> projects = projectRepository.findAll();
        String url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=";
        Member member;
        Optional<Member> optional;
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        Document doc = null;  
        String date="div#row tbody tr td span[data-testid]";
        for (int i= 0; i < projects.size(); i++) {
             Project prj=projects.get(i);
             try {
                 doc = Jsoup.connect(url+prj.getName()).get(); // -- 1. get諛⑹떇?쓽 URL?뿉 ?뿰寃고빐?꽌 媛??졇?삩 媛믪쓣 doc?뿉 ?떞?뒗?떎.
             } catch (IOException e) {
                 System.out.println(e.getMessage());
                 System.out.println("fail");
             }  
             Elements examples = doc.select(date);
             prj.setCveDate(examples.get(0).text());
             projectRepository.saveAndFlush(prj);
            System.out.println(prj.getName());
        }
            System.out.println("success");
    }
    } 