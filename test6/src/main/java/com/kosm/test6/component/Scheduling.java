package com.kosm.test6.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import com.kosm.test6.repository.OpenSourceRepository;
import com.kosm.test6.repository.ProjectRepository;
import com.kosm.test6.model.Member;
import com.kosm.test6.model.UserProject;
import com.kosm.test6.model.Project;
import com.kosm.test6.model.OpenSource;
import org.springframework.beans.factory.annotation.Autowired;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

//import com.kosm.test6.payload.UserSummary;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.repository.UserProjectRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.ArrayList;
//import com.kosm.test6.payload.UserSummary;
import java.util.List;
import java.util.Optional;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Document;

@Component
@RequiredArgsConstructor
public class Scheduling {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OpenSourceRepository openSourceRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    JavaMailSender javaMailSender;
    
    @Autowired
    private UserProjectRepository userProjectRepository;// UserProject

    //@Scheduled(fixedDelay = 100000000) // 20�?
    public void simplePrintln(Long pjt_id) throws MessagingException {
        List<UserProject> all_id = userProjectRepository.findAll();
        List<UserProject> members_id = new ArrayList<UserProject>();
        for(int i = 0; i < all_id.size(); i++){
            if(all_id.get(i).getProject_id() == pjt_id)
                members_id.add(all_id.get(i));
        } 
       
       // List<Member> members = userRepository.findAll();
        Member member;
        Optional<Member> optional;
        MimeMessage msg = javaMailSender.createMimeMessage();
         //true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        for (int i= 0; i < members_id.size(); i++) {
            //optional = userRepository.findById((long) projects.get(i).getUser_id());
            optional =userRepository.findById(members_id.get(i).getUser_id());
            member = optional.get();
            helper.setTo(member.getEmail());
            helper.setSubject("Testing from Spring Boot");

            Optional<Project> target_pjt = projectRepository.findById((long)members_id.get(i).getProject_id());
            Project target = target_pjt.get();
            String projectName = target.getName();
        
            String content ="This is a Kosm.\n" + projectName + "is updated!\n" + "Check your OpenSource News!!";
            helper.setText("<h1>Thank you for Reading!</h1>" +content, true);
            javaMailSender.send(msg);
            System.out.println("success");
       }        
    }
  //  @Scheduled(fixedDelay = 100000000) // 100�� //link���� ��¥ ũ�Ѹ� ���������Ʈ ��¥ ũ�Ѹ���ȸ;
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
        String other_date2="div>div>div>div>ul>li>a>span ";
        String release="div div h4 a";
        String time="relative-time";
        for (int i= 0; i < projects.size(); i++) {
            Project prj=projects.get(i);
            try {
                doc = Jsoup.connect(url+prj.getName()).get(); // -- 1. get방식?�� URL?�� ?��결해?�� �??��?�� 값을 doc?�� ?��?��?��.
            } catch (IOException e) {
                System.out.println(e.getMessage());
                System.out.println("fail");
            }  
            if(prj.getLink()!=null&&!prj.getLink().isEmpty()) 
            {
                try {
                    doc2 = Jsoup.connect(prj.getLink()+"/releases").get(); // -- 1. get방식?�� URL?�� ?��결해?�� �??��?�� 값을 doc?�� ?��?��?��.
                    Elements example2 = doc2.select(release);
                    Elements EEEE=doc2.select(other_date2);
                    Elements example3 = doc2.select(time);
                    if(!example2.isEmpty())
                    {prj.setVersion(example2.get(0).text());
                    prj.setReleaseDate(example3.get(0).text());
                    }
                    else if(!EEEE.isEmpty())
                    {
                    prj.setVersion(EEEE.get(0).text());
                    prj.setReleaseDate(example3.get(0).text());
                    }
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                    System.out.println("fail");
                }  
            }
             
            Elements examples = doc.select(date);
            if(!prj.getCveDate().equals(examples.get(0).text())){
                prj.setCveDate(examples.get(0).text());
                simplePrintln(prj.getId());
            }
            projectRepository.saveAndFlush(prj);
            System.out.println(prj.getName());
        }

        System.out.println("success");
    }

    @Transactional
    @Scheduled(fixedDelay = 100000000)
    // 'open_source' table insert function. Annotate the above 2 lines of code if you don't want to crawl
    public void insert_in_DB() throws MessagingException, IOException {
        List<Project> projects = projectRepository.findAll();
        String url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=";
        String total= "div.row div.col-sm-12.col-lg-3>strong";
        String cvecode = "div#row tbody tr th strong";
        String summary = "div#row tbody tr td p";
        String date = "div#row tbody tr td span[data-testid]";
        String score = "div#row tbody tr td[nowrap=nowrap]";
        String index="&startIndex=";
        int all=1;
        Document doc = null;  
        Document doc2 = null; 
        List<OpenSource> openSources = openSourceRepository.findAll();
        System.out.println(projects.size());
        for (int k= 0; k < projects.size(); k++) {
            Project prj=projects.get(k);
            try {
                doc = Jsoup.connect(url+prj.getName()).get();
                Elements Total = doc.select(total);
                all=Integer.parseInt(Total.text());
            } catch (IOException e) {
                System.out.println(e.getMessage());
                System.out.println("fail");
            }
            System.out.println(prj.getName());  
            for(int i=0;i<all;i+=20)
            { 
                try {
                    doc2 = Jsoup.connect(url+prj.getName()+index+i).get(); //    
                } catch (IOException e) {
                System.out.println(e.getMessage());
                System.out.println("fail");
                }    
                for(int j=0;i+j<all&&j<20;j++)   
                {      
                    Elements cves = doc2.select(cvecode); // --    
                    Elements summaries = doc2.select(summary);   
                    Elements dates = doc2.select(date);   
                    Elements scores = doc2.select(score);   
                    String A=cves.get(j).text();    
                    String B=summaries.get(j).text();   
                    String C=dates.get(j).text();    
                    String D=scores.get(j).text();    
                    String[] E =D.split(" ");
                    double V3=0;
                    double V2=0;
                    if(E.length>3)
                        {V3=Double.parseDouble(E[1]);V2=Double.parseDouble(E[4]);}
                    else if(E.length==3)
                        V2=Double.parseDouble(E[1]);
                    OpenSource opc=new OpenSource(A,prj.getName(),B,C,V3,V2);   
                    openSourceRepository.saveAndFlush(opc);
                //   System.out.println(cves.get(j).text());    
                }
            }
    
        }
    }
   // @Transactional
 //   @Scheduled(fixedDelay = 100000000) // 100��
    public void example()
    {
        List<OpenSource> openSources = openSourceRepository.findBylibirary("OpenSSL");
        System.out.println(openSources.size());
    
    } 
}
