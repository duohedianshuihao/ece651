package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.google.gson.Gson;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class UserController {

    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "/regUser", method = POST)
    public ResponseEntity<Void> regUser(@RequestBody  String newUser)
                                        //UriComponentsBuilder builder)
    {
        Gson gson = new Gson();
        User user = gson.fromJson(newUser, User.class);

        if (user.getEmail().trim().length() > 0 && user.getUserName().trim().length() > 0 && user.getPassword().trim().length() > 0) {
//            if (userDao.findUserInSharkJobUserTableThroughUsername(userName) != null) {
//                return new ResponseEntity<>(HttpStatus.CONFLICT);
//            }
//            if (userDao.findUserInSharkJobUserTableThroughEmail(email) != null) {
//                return new ResponseEntity<>(HttpStatus.CONFLICT);
//            }
//            User user = new User();
//            user.setEmail(email);
//            user.setUserName(userName);
//            user.setPassword(password);

            //HttpHeaders header = new HttpHeaders();
            //header.setLocation(builder.path("/login").build().toUri());

            return new ResponseEntity<>(HttpStatus.CREATED);

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

