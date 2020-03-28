package com.kosm.test6.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import com.kosm.test6.service.JsonCompponent;
import com.kosm.test6.config.JsonConfig;
import com.kosm.test6.exception.AppException;
import com.kosm.test6.model.Member;
import com.kosm.test6.model.Role;
import com.kosm.test6.model.RoleName;
import com.kosm.test6.model.TempMember;
import com.kosm.test6.payload.AdminRequest;
import com.kosm.test6.payload.ApiResponse;
import com.kosm.test6.payload.ChangePasswordRequest;
import com.kosm.test6.payload.HashRequest;
import com.kosm.test6.payload.JwtAuthenticationResponse;
import com.kosm.test6.payload.LoginRequest;
import com.kosm.test6.payload.NameChangeRequest;
import com.kosm.test6.payload.SignUpRequest;
import com.kosm.test6.payload.UserSummary;
import com.kosm.test6.repository.RoleRepository;
import com.kosm.test6.repository.TempRepository;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.security.JwtTokenProvider;
import org.springframework.context.annotation.PropertySource;
import java.net.URI;
import java.util.Collections;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@PropertySource("application.properties")
@RequestMapping("/api/auth")
public class AuthController {
        

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TempRepository TempRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    JavaMailSender javaMailSender;
    
    
    @Autowired
    JsonCompponent JsonObject;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> Sendlink(@Valid @RequestBody SignUpRequest signUpRequest) {  
    //    JSONObject JsonObject =new JSONObject();
        System.out.println(signUpRequest.getEmail());
        System.out.println(signUpRequest.getPassword());  
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
                System.out.println(signUpRequest.getUsername());  
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
                System.out.println("2"); 
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        //System.out.println(signUpRequest.getPassword());  
                try {   
                        String secret=passwordEncoder.encode(signUpRequest.getEmail());
                          //////temp memory
                          secret = secret.replace("/", "");
                          TempMember user = new TempMember(signUpRequest.getUsername(),
                          signUpRequest.getEmail(), signUpRequest.getPassword(),secret);
                          TempRepository.save(user);
                       // message
                        /////////////////
                        MimeMessage msg = javaMailSender.createMimeMessage();
                        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
                        helper.setFrom("KOSM <kosm.manager@gmail.com>"); // 완 : 전 이거없인 회원가입이 되지않아요ㅠ
                        helper.setTo(signUpRequest.getEmail());
                        System.out.println(signUpRequest.getEmail()+"FUck");
                        helper.setSubject("KOSM 회원가입을 환영합니다.");
                      
                        String url= "http://localhost:3000/success/"+secret;
                        JsonObject.put("key",secret);
                        String jsonInfo = JsonObject.toJsonString();
                        //  String content = "please Enter this Link for signup.!" + 
                        //   "<a href='http://localhost:3000/success'>Sign Up</a>";
                        String content = "please Enter this Link for signup.!" + 
                        "<a href="+url+">Sign Up</a>";

                        String emailContent = "<div style='width:700px;border:1px solid #cecece;border-top:1px solid #3aada8;font-size:20px;'><img src='https://kwangwoon-syllabus.s3.ap-northeast-2.amazonaws.com/kosm_bg.gif'><div style='width:100%;border-bottom:1px solid #cecece;'><div style='width:600px;margin:0 auto;margin-bottom:64px;margin-top:40px;'><span style='color:#363636;font-size:16px;line-height:22px;'>KOSM 회원가입을 진심으로 환영합니다.<br><br>아래 버튼을 클릭하여 회원가입을 완료해주세요.<br></span><br><br><span style='font-size:16px;color:#808080;'>KOSM Team</span><center><a class='mail_btn' href='" + url + "' target='_blank'style='display:block;:50px;padding-left:30px;padding-right:30px;font-size:20px;color:white;line-:48px;margin:0 auto;text-align:center;display:inline-block;border-radius:10px;text-decoration:none;margin-top:35px;border:1px solid #f7870f;background:#fe931f;background-position:95% center;'rel='noreferrer noopener'>회원가입<img src='http://earthtory.com/res/img/mail/common/arrow_yellow.gif'style='float:right;margin-top:18px;margin-left:5px;' alt=''></a></center></div></div><!-- <div style='width:700px;height:56px;'><a class='app_button' href='https://play.google.com/store/apps/details?id=com.earthtory' target='_blank' style='margin-left:20px;float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>Android</a><a class='app_button' href='https://itunes.apple.com/kr/app/eoseutoli-earthtory-juyo-gwangwangji/id919377935?mt=8' target='_blank' style='float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>iOS</a><a class='ss_btn' href='http://blog.earthtory.com/' target='_blank' style='float:right;margin-left:10px;margin-right:20px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_bl.gif' alt='' border='0'></a><a class='ss_btn' href='https://www.facebook.com/Earthtory' target='_blank' style='float:right;margin-left:10px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_fb.gif' alt='' border='0'></a></div> --></div>";

                        //helper.setText("<h1>Thank you for Login!</h1>" +content, true);
                        helper.setText(emailContent, true);
                        javaMailSender.send(msg);
                        System.out.println(jsonInfo);
                        return new ResponseEntity<>( jsonInfo, HttpStatus.OK);
                 }
                 catch (Exception e) {
                        System.out.println("Fuck!!@@@@@@@@@@@@@@@@@@@@@@@");
                        System.out.println(e);
                        return new ResponseEntity<>(new ApiResponse(false, "Email isn't exits!"),
                        HttpStatus.BAD_REQUEST);
                }  
           
        }

    @PostMapping("/signok")
    public ResponseEntity<?> registerUser(@Valid @RequestBody HashRequest hashRequest) {
        // Creating user's account
        System.out.println(hashRequest.getHash()+"FUck1");
        try{    //TempRepository
               TempMember tempuser =TempRepository.findByHash(hashRequest.getHash());
                Member user = new Member(tempuser.getUsername(),
                tempuser.getEmail(), tempuser.getPassword());
                TempRepository.delete(tempuser);
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new AppException("User Role not set."));

                user.setRoles(Collections.singleton(userRole));

                Member result = userRepository.save(user);
                
                URI location = ServletUriComponentsBuilder
                        .fromCurrentContextPath().path("/api/users/{username}")
                        .buildAndExpand(result.getUsername()).toUri();

                return ResponseEntity.created(location).body(new ApiResponse(true, result.getUsername()));
        }
        catch (Exception e)
        {
                //System.out.println(tempuser.getEmail()+"error1");
              //  System.out.println(tempuser.getPassword()+"error2");
                return new ResponseEntity<>(new ApiResponse(false, "Email isn't exits!"),
                        HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/deleteUser")
    public  ResponseEntity<?> deleteUser(@RequestBody LoginRequest request){
        try{
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        //SecurityContextHolder.getContext().setAuthentication(authentication);
        Member member = userRepository.findByEmail(request.getEmail());

        userRepository.delete(member);

        
        URI location = ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .buildAndExpand(member.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User Deleted successfully"));
       
        } catch (Exception e)
        {
                return new ResponseEntity<>(new ApiResponse(false, "Password not correct"),
                        HttpStatus.BAD_REQUEST);
        }
       }




       @PutMapping("/changeName")
       public  ResponseEntity<?> changeName(@RequestBody NameChangeRequest request){
                Member member = userRepository.findByEmail(request.getEmail());
                member.setUsername(request.getUsername());

                userRepository.saveAndFlush(member);

                return new ResponseEntity<>(new ApiResponse(true, "Username Changed successfully") ,HttpStatus.OK);
       }


       @PutMapping("/changePassword")
       public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        try{
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getBeforePassword()
                        )
                );

                Member member = userRepository.findByEmail(request.getEmail());

                member.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.saveAndFlush(member);

                return new ResponseEntity<>(new ApiResponse(true, "Password Changed successfully") ,HttpStatus.OK);
        } catch (Exception e)
        {
                return new ResponseEntity<>(new ApiResponse(false, "Password not correct"),
                        HttpStatus.BAD_REQUEST);
        }
       }

       @PostMapping("/admin")
        public ResponseEntity<?> checkAdmin(@RequestBody AdminRequest request) {
        if(request.getPassword().equals("1111")){
                return new ResponseEntity<>(new ApiResponse(true, "Login Success") ,HttpStatus.OK);
        }else{
                return new ResponseEntity<>(new ApiResponse(false, "Password not correct"),
                        HttpStatus.BAD_REQUEST);
        }
    }
}