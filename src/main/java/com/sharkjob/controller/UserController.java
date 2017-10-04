package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    //private final AtomicLong counter = new AtomicLong();
    @Autowired
    private User user;

    @RequestMapping("/user")
    public User user(@RequestParam String email,
                     @RequestParam String userType,
                     @RequestParam String userName,
                     @RequestParam String skills,
                     @RequestParam String password) {

        user.setEmail(email);
        user.setUserType(userType);
        user.setUserName(userName);
        user.setSkills(skills);
        user.setPassword(password);

        return user;
    }
}
