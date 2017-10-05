package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void loginUser(@RequestParam String emailorusername,
                          @RequestParam String password) {
        //check it is email or userName
        //find its password?
        //match


        //@RequestMapping(value = "/updateSkills", method = POST)
        //find exception->update
        //@RequestMapping(value = "/changeEmail", method = POST)
        //@RequestMapping(value = "/changeUserName", method = POST)
        //@RequestMapping(value = "/changePassword", method = POST)
    }


    @RequestMapping(value="/getUser",method = GET)
    public User getUserInfo(@RequestParam String email) {

        return userDao.findUserInSharkJobUserTableThroughEmail(email);
    }
}
