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
        helper.setSubject("Testing from Spring Boot");
      
         String content = "please Enter this Link for signup.!" +
         "<a href='http://localhost:3000/source'>Sign Up</a>";
        helper.setText("<h1>Thank you for Login!</h1>" +content, true);
        javaMailSender.send(msg);

         return new ResponseEntity<String>("SendOk", HttpStatus.OK);
    } catch (Exception e) {
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
        helper.setSubject("Kosm 임시비밀번호 발급");

        String emailContent = "<div style='width:700px;border:1px solid #cecece;border-top:1px solid #3aada8;font-size:20px;'><img src='https://kwangwoon-syllabus.s3.ap-northeast-2.amazonaws.com/kosm_bg.gif'><div style='width:100%;border-bottom:1px solid #cecece;'><div style='width:600px;margin:0 auto;margin-bottom:64px;margin-top:40px;'><span style='color:#363636;font-size:16px;line-height:22px;'>KOSM 임시비밀번호입니다.<br><br>" + pass +"<br></span><br><br><span style='font-size:16px;color:#808080;'>KOSM Team</span><center></center></div></div><!-- <div style='width:700px;height:56px;'><a class='app_button' href='https://play.google.com/store/apps/details?id=com.earthtory' target='_blank' style='margin-left:20px;float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>Android</a><a class='app_button' href='https://itunes.apple.com/kr/app/eoseutoli-earthtory-juyo-gwangwangji/id919377935?mt=8' target='_blank' style='float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>iOS</a><a class='ss_btn' href='http://blog.earthtory.com/' target='_blank' style='float:right;margin-left:10px;margin-right:20px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_bl.gif' alt='' border='0'></a><a class='ss_btn' href='https://www.facebook.com/Earthtory' target='_blank' style='float:right;margin-left:10px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_fb.gif' alt='' border='0'></a></div> --></div>";

        helper.setText(emailContent, true);
        javaMailSender.send(msg);
        
    } catch (Exception e) {
        System.out.println(e);
        
    }  
return new ResponseEntity<String>("Success to send", HttpStatus.OK);
}
else
return new ResponseEntity<String>("not exits", HttpStatus.OK);
}
}
