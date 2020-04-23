package com.kosm.test6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import com.kosm.test6.service.JsonCompponent;
import com.kosm.test6.payload.Crawling;
import com.kosm.test6.repository.OpenSourceRepository;
import com.kosm.test6.repository.ProjectRepository;

import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.kosm.test6.model.OpenSource;
import com.kosm.test6.model.Project;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/auth")


public class WebCrawler {
    @Autowired
    JsonCompponent JsonObject;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private OpenSourceRepository openSourceRepository;

    @PostMapping("/webcrawler")
    public  ResponseEntity<?> sayHello(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
      JsonObject.newinit_Object();
        //String url = "https://www.w3schools.com";
        Project prj;
        Optional<Project> op=projectRepository.findByName(CrawlRequest.getName());
        List<OpenSource> openSources = openSourceRepository.findBylibirary(CrawlRequest.getName());
        prj=op.get();
       
        String url =CrawlRequest.getUrl();
        String graph=prj.getGraph();
        String Link=prj.getLink();
        String Release=prj.getVersion();
        String ReleaseDate=prj.getReleaseDate();
        /*
        String title = "div#row tbody tr th strong";
        String summary = "div#row tbody tr td p";
        String date = "div#row tbody tr td span[data-testid]";
        String score = "div#row tbody tr td[nowrap=nowrap]";
        String example="";
        String total= "div.row div.col-sm-12.col-lg-3>strong";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 
        Elements summaries = doc.select(summary);
        Elements dates = doc.select(date);
        Elements scores = doc.select(score);
        Elements totals = doc.select(total);*/
        JsonObject.put("graph",graph); 
        JsonObject.put("Link",Link); 
        JsonObject.put("Release",Release); 
        JsonObject.put("ReleaseDate",ReleaseDate); 
        JsonObject.put("total",Integer.toString(openSources.size())); 
        for(int i=0;i<openSources.size();i++) {
            OpenSource openSource=openSources.get(i);
             // -- 3. Elemntes 길이만큼 반복?��?��.
            JsonObject.put("title",openSource.getCode()); 
            JsonObject.put("date",openSource.getDate()); 
            JsonObject.put("summary",openSource.getSummary()); 
            JsonObject.put("v2",Double.toString(openSource.getV2())); 
            JsonObject.put("v3",Double.toString(openSource.getV3())); 
            JsonObject.add(JsonObject.deepclone());
           // System.out.println(JsonObject.toJsonString());
        }
     //   JsonObject.add(JsonObject.deepclone());
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
    //    System.out.println(i);
    System.out.println(jsonInfo);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

    }
    @PostMapping("/V3?sort=v3,desc")
    public  ResponseEntity<?> Sorting_V3(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
      JsonObject.newinit_Object();
        //String url = "https://www.w3schools.com";
        Project prj;
        Optional<Project> op=projectRepository.findByName(CrawlRequest.getName());
        List<OpenSource> openSources = openSourceRepository.findBylibirary(CrawlRequest.getName());
        prj=op.get();
       
        String url =CrawlRequest.getUrl();
        String graph=prj.getGraph();
        String Link=prj.getLink();
        String Release=prj.getVersion();
        String ReleaseDate=prj.getReleaseDate();
        /*
        String title = "div#row tbody tr th strong";
        String summary = "div#row tbody tr td p";
        String date = "div#row tbody tr td span[data-testid]";
        String score = "div#row tbody tr td[nowrap=nowrap]";
        String example="";
        String total= "div.row div.col-sm-12.col-lg-3>strong";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 
        Elements summaries = doc.select(summary);
        Elements dates = doc.select(date);
        Elements scores = doc.select(score);
        Elements totals = doc.select(total);*/
        JsonObject.put("graph",graph); 
        JsonObject.put("Link",Link); 
        JsonObject.put("Release",Release); 
        JsonObject.put("ReleaseDate",ReleaseDate); 
        JsonObject.put("total",Integer.toString(openSources.size())); 
        for(int i=0;i<openSources.size();i++) {
            OpenSource openSource=openSources.get(i);
             // -- 3. Elemntes 길이만큼 반복?��?��.
            JsonObject.put("title",openSource.getCode()); 
            JsonObject.put("date",openSource.getDate()); 
            JsonObject.put("summary",openSource.getSummary()); 
            JsonObject.put("v2",Double.toString(openSource.getV2())); 
            JsonObject.put("v3",Double.toString(openSource.getV3())); 
            JsonObject.add(JsonObject.deepclone());
           // System.out.println(JsonObject.toJsonString());
        }
     //   JsonObject.add(JsonObject.deepclone());
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
    //    System.out.println(i);
    System.out.println(jsonInfo);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

  }
  @PostMapping("/V2?sort=v2,desc")
    public  ResponseEntity<?> Sorting_V2(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
      JsonObject.newinit_Object();
        //String url = "https://www.w3schools.com";
        Project prj;
        Optional<Project> op=projectRepository.findByName(CrawlRequest.getName());
        List<OpenSource> openSources = openSourceRepository.findBylibirary(CrawlRequest.getName());
        prj=op.get();
       
        String url =CrawlRequest.getUrl();
        String graph=prj.getGraph();
        String Link=prj.getLink();
        String Release=prj.getVersion();
        String ReleaseDate=prj.getReleaseDate();
        /*
        String title = "div#row tbody tr th strong";
        String summary = "div#row tbody tr td p";
        String date = "div#row tbody tr td span[data-testid]";
        String score = "div#row tbody tr td[nowrap=nowrap]";
        String example="";
        String total= "div.row div.col-sm-12.col-lg-3>strong";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 
        Elements summaries = doc.select(summary);
        Elements dates = doc.select(date);
        Elements scores = doc.select(score);
        Elements totals = doc.select(total);*/
        JsonObject.put("graph",graph); 
        JsonObject.put("Link",Link); 
        JsonObject.put("Release",Release); 
        JsonObject.put("ReleaseDate",ReleaseDate); 
        JsonObject.put("total",Integer.toString(openSources.size())); 
        for(int i=0;i<openSources.size();i++) {
            OpenSource openSource=openSources.get(i);
             // -- 3. Elemntes 길이만큼 반복?��?��.
            JsonObject.put("title",openSource.getCode()); 
            JsonObject.put("date",openSource.getDate()); 
            JsonObject.put("summary",openSource.getSummary()); 
            JsonObject.put("v2",Double.toString(openSource.getV2())); 
            JsonObject.put("v3",Double.toString(openSource.getV3())); 
            JsonObject.add(JsonObject.deepclone());
           // System.out.println(JsonObject.toJsonString());
        }
     //   JsonObject.add(JsonObject.deepclone());
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
    //    System.out.println(i);
    System.out.println(jsonInfo);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

  }
    @PostMapping("/detailcrawler")
    public  ResponseEntity<?> Hello(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
      JsonObject.newinit_Object();
 /*
            Document ?��?��?�� : ?��결해?�� ?��?��?�� HTML ?���? 문서
            Element ?��?��?��  : Documnet?�� HTML ?��?��
            Elements ?��?��?�� : Element�? 모인 ?��료형
        */       
        //String url = "https://www.w3schools.com";
        String url =CrawlRequest.getUrl();

        String title = "div p[data-testid=vuln-description]";
   //     String type="div.col-lg-6 input[value]";
    //    String date = "div#row tbody tr td span[data-testid]";
        String link="tbody > tr > td > [href]";
        String info="div.bs-callout.bs-callout-info > span[data-testid]";
        String score="span.severityDetail";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 1. get방식?�� URL?�� ?��결해?�� �??��?�� 값을 doc?�� ?��?��?��.
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 2. doc?��?�� selector?�� ?��?��?�� �??��??? Elemntes ?��?��?��?�� ?��?��?��.
     //   Elements types = doc.select(type);
        Elements links = doc.select(link);
        Elements infos = doc.select(info);
        Elements scores = doc.select(score);
        ////
        String A="";
        String B="";
        String C="";
        String D="";
        //
        for(int i=0;i<titles.size();i++) 
        {  A+=(titles.get(i).text()+',');}
     for(int i=0;i<links.size();i++)
        {  B+=(links.get(i).attr("href")+','); }
     for(int i=0;i<scores.size();i++)    
        {  if(!scores.get(i).text().equals("N/A")) C+=(scores.get(i).text()+',');}
     for(int i=0;i<infos.size();i++)        
       {   D+=(infos.get(i).text()+',');}
      // JsonObject.put("type",types.toString()); 
      
      System.out.println(A);
       JsonObject.put("title",A);
       JsonObject.put("links",B);
       JsonObject.put("scores",C);
       JsonObject.put("infos",D.substring(11));
     //  JsonObject.put("date",date);
       JsonObject.add(JsonObject.deepclone());
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
        System.out.println(jsonInfo);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

    }

}