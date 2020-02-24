package com.kosm.test6.controller;

import java.util.Set;

import com.kosm.test6.model.Member;
import com.kosm.test6.model.Project;
import com.kosm.test6.payload.ProjectResponse;
import com.kosm.test6.payload.UserIdentityAvailability;
import com.kosm.test6.repository.ProjectRepository;
//import com.kosm.test6.payload.UserSummary;
import com.kosm.test6.repository.UserRepository;
import com.kosm.test6.security.CurrentUser;
import com.kosm.test6.security.UserPrincipal;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    

    //private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserPrincipal getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserPrincipal userPrincipal = new UserPrincipal(currentUser.getId(), currentUser.getUsername(), currentUser.getEmail(), currentUser.getPassword(), currentUser.getAuthorities());
        return userPrincipal;
    }


    @PostMapping("/user/addFavProject")
    public Long addFav(@RequestBody ProjectResponse request) {
        Member member = userRepository.getOne(request.getUser_id());
        Project project = projectRepository.getOne(request.getProject_id());

        Set<Member> members = project.getMembers();
        members.add(member);

        projectRepository.saveAndFlush(project);

        return request.getProject_id();
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
}