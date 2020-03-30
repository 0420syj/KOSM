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

    //@Scheduled(fixedDelay = 100000000) // 20ì´?
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
   // @Scheduled(fixedDelay = 100000000) // 100ÃÊ //linkµé¾î°¡¼­ ³¯Â¥ Å©·Ñ¸µ ¸ðµçÇÁ·ÎÁ§Æ® ³¯Â¥ Å©·Ñ¸µÁ¶È¸;
    public void Monitoring_Project() throws MessagingException {
        List<Project> projects = projectRepository.findAll();
        String url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=";
        Member member;
        Optional<Member> optional;
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        Document doc = null;  
        Document doc2 = null; 
        String date="div#row tbody tr td span[data-testid]";
        String date2="div.no-wrap span .no-wrap";
        for (int i= 0; i < projects.size(); i++) {
             Project prj=projects.get(i);
             try {
                 doc = Jsoup.connect(url+prj.getName()).get(); // -- 1. getë°©ì‹?˜ URL?— ?—°ê²°í•´?„œ ê°?? ¸?˜¨ ê°’ì„ doc?— ?‹´?Š”?‹¤.
             } catch (IOException e) {
                 System.out.println(e.getMessage());
                 System.out.println("fail");
             }  
             if(prj.getLink()!=null) 
             {
                try {
                    doc2 = Jsoup.connect(prj.getLink()).get(); // -- 1. getë°©ì‹?˜ URL?— ?—°ê²°í•´?„œ ê°?? ¸?˜¨ ê°’ì„ doc?— ?‹´?Š”?‹¤.
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                    System.out.println("fail");
                }  
                Elements example2 = doc2.select(date2);
                prj.setReleaseDate(example2.text());
             }
             Elements examples = doc.select(date);
             prj.setCveDate(examples.get(0).text());
             projectRepository.saveAndFlush(prj);
            System.out.println(prj.getName());
        }
            System.out.println("success");
        }
    } 