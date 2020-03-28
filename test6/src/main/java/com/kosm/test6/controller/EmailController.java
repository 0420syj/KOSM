package com.kosm.test6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import org.springframework.security.authentication.AuthenticationManager;


import com.kosm.test6.component.authpassword;
import com.kosm.test6.model.Member;
import com.kosm.test6.payload.EmailResponse;
import com.kosm.test6.payload.UserIdentityAvailability;
import com.kosm.test6.repository.UserRepository;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.context.annotation.PropertySource;
@RestController
@RequestMapping("/api/auth")
@PropertySource("application.properties")
public class EmailController {
@Autowired
JavaMailSender javaMailSender;
@Autowired
private UserRepository userRepository;
@Autowired
PasswordEncoder passwordEncoder; 
@Autowired
AuthenticationManager authenticationManager;

    @PostMapping("/main")
public ResponseEntity<?> EmailSend(@Valid @RequestBody EmailResponse EmailRequest) {
    try {      
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(EmailRequest.getEmail());
        System.out.println(EmailRequest.getEmail()+"FUck");
        helper.setSubject("Testing from Spring Boot");
      
         String content = "please Enter this Link for signup.!" +
         "<a href='http://localhost:3000/source'>Sign Up</a>";
        helper.setText("<h1>Thank you for Login!</h1>" +content, true);
        javaMailSender.send(msg);

         return new ResponseEntity<String>("SendOk", HttpStatus.OK);
    } catch (Exception e) {
        System.out.println("Fuck!!");
        return new ResponseEntity<String>("SendOk", HttpStatus.OK);
    }  
}
@Autowired
authpassword Password;
//@Autowired
//JsonComponent JsonObject;

@PostMapping("/forgot")
public  ResponseEntity<?> PasswordSend(@Valid @RequestBody EmailResponse EmailRequest) {
    
    Boolean isAvailable = !userRepository.existsByEmail(EmailRequest.getEmail());
    if(isAvailable==false)
    {
    try {      
       
       // List<Member> members= userRepository.findAll();
        Member member = userRepository.findByEmail(EmailRequest.getEmail());
        String pass=Password.excuteGenerate();
        member.setPassword(passwordEncoder.encode(pass));
/////////////////////////////      
        userRepository.saveAndFlush(member);
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setFrom("KOSM <kosm.manager@gmail.com>");
        helper.setTo(EmailRequest.getEmail());
        helper.setSubject("Kosm password has Changed");
        helper.setText("<h1>This is your temp password!</h1>" +pass, true);
        javaMailSender.send(msg);
        
    } catch (Exception e) {
        System.out.println("Fuck!!");
        System.out.println(e);
        
    }  
return new ResponseEntity<String>("Success to send", HttpStatus.OK);
}
else
return new ResponseEntity<String>("not exits", HttpStatus.OK);
}
}
