package com.kosm.test6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import com.kosm.test6.exception.AppException;
import com.kosm.test6.model.Member;
import com.kosm.test6.model.Role;
import com.kosm.test6.model.RoleName;
import com.kosm.test6.payload.ApiResponse;
import com.kosm.test6.payload.JwtAuthenticationResponse;
import com.kosm.test6.payload.LoginRequest;
import com.kosm.test6.payload.SignUpRequest;
import com.kosm.test6.repository.RoleRepository;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.security.JwtTokenProvider;
import org.springframework.context.annotation.PropertySource;
import java.net.URI;
import java.util.Collections;

@RestController
@PropertySource("application.properties")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    JavaMailSender javaMailSender;
    
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
                        MimeMessage msg = javaMailSender.createMimeMessage();
                        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
                        helper.setTo(signUpRequest.getEmail());
                        System.out.println(signUpRequest.getEmail()+"FUck");
                        helper.setSubject("Testing from Spring Boot");
                         String content = "please Enter this Link for signup.!" + 
                         "<a href='http://localhost:3000/success'>Sign Up</a>";
                        helper.setText("<h1>Thank you for Login!</h1>" +content, true);
                        javaMailSender.send(msg);
                        return new ResponseEntity<String>(signUpRequest.getEmail(), HttpStatus.OK);
                 }
                 catch (Exception e) {
                        System.out.println("Fuck!!");
                        System.out.println(e);
                        return new ResponseEntity<>(new ApiResponse(false, "Email isn't exits!"),
                        HttpStatus.BAD_REQUEST);
                    }  
           
        }
           @PostMapping("/signok")
           public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        // Creating user's account
        System.out.println(signUpRequest.getEmail()+"FUck1");
        System.out.println(signUpRequest.getPassword()+"FUck2");
        try{
        Member user = new Member(signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        Member result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
        }
        catch (Exception e)
        {
        System.out.println(signUpRequest.getEmail()+"error1");
        System.out.println(signUpRequest.getPassword()+"error2");
        return new ResponseEntity<>(new ApiResponse(false, "Email isn't exits!"),
                  HttpStatus.BAD_REQUEST);
        }
    }
}