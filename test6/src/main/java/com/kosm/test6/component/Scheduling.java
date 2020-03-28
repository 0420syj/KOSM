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
    private int i = 0;

    @Scheduled(fixedDelay = 50000) // 20초
    public void simplePrintln() throws MessagingException {
        i++;
        //

        // Member member = userRepository.getOne(request.getUser_id());
        // Project project = projectRepository.getOne(request.getProject_id());

        // Set<Member> members = project.getMembers();
        // members.add(member);

        // projectRepository.saveAndFlush(project);

        // List<ProjectListResponse>
        // respon=projectRepository.findAll().stream().map(project -> new
        // ProjectListResponse(project))
        // .collect(Collectors.toList());
        // System.out.println(respon.get(0).getId());
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
    } 