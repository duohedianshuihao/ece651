package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UserController {

    //private final AtomicLong counter = new AtomicLong();
    @Autowired
    private User user;

    @Autowired
    private UserDao userDao;

    @RequestMapping(value="/user",method=POST)
    public void user(@RequestParam String email,
                     @RequestParam String userType,
                     @RequestParam String userName,
                     @RequestParam String skills,
                     @RequestParam String password) {

        user.setEmail(email);
        user.setUserType(userType);
        user.setUserName(userName);
        user.setSkills(skills);
        user.setPassword(password);

        userDao.saveUserInSharkJobUserTable(user);
    }

    @RequestMapping(value="/user",method=GET)
    public User user(@RequestParam String email) {

        return userDao.findUserInSharkJobUserTableThroughEmail(email);
    }
}
