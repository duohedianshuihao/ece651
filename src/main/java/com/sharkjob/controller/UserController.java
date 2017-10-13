package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @PostMapping(value="/regUser")
    public ResponseEntity<Void> regUser(@RequestParam String email,
                                        @RequestParam String userName,
                                        @RequestParam String password,
                                        UriComponentsBuilder builder) {

        if (email.trim().length() > 0 && userName.trim().length() > 0 && password.trim().length() > 0) {
            if (userDao.findUserInSharkJobUserTableThroughUsername(userName) != null) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            if (userDao.findUserInSharkJobUserTableThroughEmail(email) != null) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            User user = new User();
            user.setEmail(email);
            user.setUserName(userName);
            user.setPassword(password);

            HttpHeaders header = new HttpHeaders();
            header.setLocation(builder.path("/login").build().toUri());

            return new ResponseEntity<>(header, HttpStatus.CREATED);

        } else {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }

    }

    @PostMapping(value = "/toLogIn")
    public ResponseEntity<Void> loginUser(@RequestParam String emailorusername,
                                          @RequestParam String password,
                                          UriComponentsBuilder builder) {

        User user;

        if(emailorusername.contains("@")) {
            user = userDao.findUserInSharkJobUserTableThroughEmail(emailorusername);
        }
        else {
            user = userDao.findUserInSharkJobUserTableThroughUsername(emailorusername);
        }

        if(user != null) {
            if (user.getPassword() == password) {
                HttpHeaders header = new HttpHeaders();
                header.setLocation(builder.path("/index?username={username}").buildAndExpand(user.getUserName()).toUri());

                return new ResponseEntity<>(header, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }


    @RequestMapping(value = "/updateSkills", method = POST)
    public boolean updateSkills(@RequestParam String email,
                                @RequestParam List<String> skills) {

        return userDao.updateSkillsInSharkJobUserTableThroughEmail(email, skills);
    }

    //find exception->update
    //@RequestMapping(value = "/changeEmail", method = POST)
    //@RequestMapping(value = "/changeUserName", method = POST)
    //@RequestMapping(value = "/changePassword", method = POST)


    @RequestMapping(value="/getUser",method = GET)
    public User getUserInfo(@RequestParam String email) {
        //check if return is null
        return userDao.findUserInSharkJobUserTableThroughEmail(email);
    }
}

