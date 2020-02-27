package com.kosm.test6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import javax.validation.Valid;

import com.kosm.test6.exception.AppException;
import com.kosm.test6.model.Member;
import com.kosm.test6.model.Role;
import com.kosm.test6.model.RoleName;
import com.kosm.test6.payload.ApiResponse;
import com.kosm.test6.payload.Crawling;
import com.kosm.test6.payload.JwtAuthenticationResponse;
import com.kosm.test6.payload.LoginRequest;
import com.kosm.test6.payload.SignUpRequest;
import com.kosm.test6.repository.RoleRepository;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.security.JwtTokenProvider;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/webcrawler")
public class WebCrawler {
    @PostMapping("/main")
    public  ResponseEntity<?> sayHello(@Valid @RequestBody Crawling CrawlRequest){
 /*
            Document 클래스 : 연결해서 얻어온 HTML 전체 문서
            Element 클래스  : Documnet의 HTML 요소
            Elements 클래스 : Element가 모인 자료형
        */       
        //String url = "https://www.w3schools.com";
        String url =CrawlRequest.getUrl();
        String selector = "div.w3-container h4";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 1. get방식의 URL에 연결해서 가져온 값을 doc에 담는다.
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(selector); // -- 2. doc에서 selector의 내용을 가져와 Elemntes 클래스에 담는다.
        for(Element element: titles) { // -- 3. Elemntes 길이만큼 반복한다.
            System.out.println(element.text()); // -- 4. 원하는 요소가 출력된다.
        }
        //return new ResponseEntity<>("Hello World!", HttpStatus.OK);
       return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));
    }

}