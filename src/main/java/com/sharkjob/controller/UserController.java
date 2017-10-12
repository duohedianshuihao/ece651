package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @RequestMapping(value="/regUser",method = POST)
    public boolean regUser(@RequestParam String email,
                           @RequestParam String userName,
                           @RequestParam String password) {

        if (email.trim().length() > 0 && userName.trim().length() > 0 && password.trim().length() > 0) {
            if (userDao.findUserInSharkJobUserTableThroughUsername(userName) == null) {
                return false;
            }
            if (userDao.findUserInSharkJobUserTableThroughEmail(email) == null) {
                return false;
            }
            User user = new User();
            user.setEmail(email);
            user.setUserName(userName);
            user.setPassword(password);

            return userDao.saveUserInSharkJobUserTable(user);

        } else {

            return false;

        }

    }

    @RequestMapping(value = "/toLogIn", method = POST)
    public boolean loginUser(@RequestParam String emailorusername,
                             @RequestParam String password) {

        User user;

        if(emailorusername.contains("@")) {
            user = userDao.findUserInSharkJobUserTableThroughEmail(emailorusername);
            if(user != null) {
                if(user.getPassword() == password) {
                    return true;
                }
            }
        }

        else {
            user = userDao.findUserInSharkJobUserTableThroughUsername(emailorusername);
            if(user != null) {
                if (user.getPassword() == password) {
                    return true;
                }
            }
        }

        return false;

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

