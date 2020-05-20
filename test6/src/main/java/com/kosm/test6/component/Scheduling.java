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
import javax.management.Query;

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
            helper.setSubject("KOSM Update 알림");
            helper.setFrom("KOSM <kosm.manager@gmail.com>"); 
            

            Optional<Project> target_pjt = projectRepository.findById((long)members_id.get(i).getProject_id());
            Project target = target_pjt.get();
            String projectName = target.getName();
        
            String content ="This is a Kosm.\n" + projectName + " is updated!\n" + "Check your OpenSource News!!";
           
            String emailContent = "<div style='width:700px;border:1px solid #cecece;border-top:1px solid #3aada8;font-size:20px;'><img src='https://kwangwoon-syllabus.s3.ap-northeast-2.amazonaws.com/kosm_bg.gif'><div style='width:100%;border-bottom:1px solid #cecece;'><div style='width:600px;margin:0 auto;margin-bottom:64px;margin-top:40px;'><span style='color:#363636;font-size:16px;line-height:22px;'>" + projectName + "의 새로운 취약점 업데이트가 발견되었습니다.<br><br>아래 버튼을 클릭하여 확인해주세요.<br></span><br><br><span style='font-size:16px;color:#808080;'>KOSM Team</span><center><a class='mail_btn' href='" + "https://localhost:3000" + "' target='_blank'style='display:block;:50px;padding-left:30px;padding-right:30px;font-size:20px;color:white;line-:48px;margin:0 auto;text-align:center;display:inline-block;border-radius:10px;text-decoration:none;margin-top:35px;border:1px solid #f7870f;background:#fe931f;background-position:95% center;'rel='noreferrer noopener'>회원가입<img src='http://earthtory.com/res/img/mail/common/arrow_yellow.gif'style='float:right;margin-top:18px;margin-left:5px;' alt=''></a></center></div></div><!-- <div style='width:700px;height:56px;'><a class='app_button' href='https://play.google.com/store/apps/details?id=com.earthtory' target='_blank' style='margin-left:20px;float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>Android</a><a class='app_button' href='https://itunes.apple.com/kr/app/eoseutoli-earthtory-juyo-gwangwangji/id919377935?mt=8' target='_blank' style='float:left;border:1px solid #c9c9c9;:80px;:29px;border-radius:3px;font-size:13px;font-weight:bold;color:#363c48;text-align:center;display:block;margin-right:5px;text-decoration:none;line-:28px;margin-top:13px;' rel='noreferrer noopener'>iOS</a><a class='ss_btn' href='http://blog.earthtory.com/' target='_blank' style='float:right;margin-left:10px;margin-right:20px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_bl.gif' alt='' border='0'></a><a class='ss_btn' href='https://www.facebook.com/Earthtory' target='_blank' style='float:right;margin-left:10px;margin-top:12px;border:0px;' rel='noreferrer noopener'><img src='http://earthtory.com/res/img/mail/common/ss_fb.gif' alt='' border='0'></a></div> --></div>";
            helper.setText(emailContent, true);
            javaMailSender.send(msg);
            System.out.println("success");
       }        
    }
    @Scheduled(fixedDelay = 100000000) // 100�� //link���� ��¥ ũ�Ѹ� ���������Ʈ ��¥ ũ�Ѹ���ȸ;
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
                    if(!example2.isEmpty()&&example2.text()!=null)
                    {prj.setVersion(example2.get(0).text());
                    prj.setReleaseDate(example3.get(0).text());
                    }
                    else if(!EEEE.isEmpty()&&EEEE.text()!=null)
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
            
            if(prj.getCveDate()==null||(!examples.isEmpty()&&examples.text()!=null&&!prj.getCveDate().equals(examples.get(0).text()))){
                prj.setCveDate(examples.get(0).text());
                simplePrintln(prj.getId());
            }
            projectRepository.saveAndFlush(prj);
            System.out.println(prj.getName()+prj.getCveDate());
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
                   // if(openSourceRepository.findByLibiraryAndCode(A,prj.getName())==null) 
                    //{
                    if(!openSourceRepository.existsByLibiraryAndCode(prj.getName(),A))
                    {
                    openSourceRepository.saveAndFlush(opc);
                    System.out.println(cves.get(j).text());   
                    }
                    else  System.out.println("already exits"); 
                }
            }
    
        }
    }
   // @Transactional
  //  @Scheduled(fixedDelay = 100000000) // 100��
    public void example()
    {
   //     String jql = "Select f from Foo as f order by f.id desc";
        //Query sortQuery = entityManager.createQuery(jql);
        List<OpenSource> openSources = openSourceRepository.findBylibiraryOrderByV3Desc("Apache Ant");

        for(int i=0;i<openSources.size();i++)
        {
            OpenSource op=openSources.get(i);
            System.out.println(op.getCode());
        }
    
    } 
}
