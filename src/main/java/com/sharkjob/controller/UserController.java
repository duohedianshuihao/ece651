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

    @Autowired
    private UserDao userDao;

    @RequestMapping(value="/regUser",method = POST)
    public void regUser(@RequestParam String email,
                     @RequestParam String userType,
                     @RequestParam String userName,
                     @RequestParam String password) {
        User user = new User();
        user.setEmail(email);
        user.setUserType(userType);
        user.setUserName(userName);
        user.setPassword(password);
        userDao.saveUserInSharkJobUserTable(user);
    }

    //@RequestMapping(value = "/updateSkills", method = POST)
    //@RequestMapping(value = "/changeEmail", method = POST)
    //@RequestMapping(value = "/changeUserName", method = POST)
    //@RequestMapping(value = "/changePassword", method = POST)

    @RequestMapping(value="/getUser",method = GET)
    public User getUserInfo(@RequestParam String email) {

        return userDao.findUserInSharkJobUserTableThroughEmail(email);
    }
}
