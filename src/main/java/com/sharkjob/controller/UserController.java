package com.sharkjob.controller;

//import java.util.concurrent.atomic.AtomicLong;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.Dao.UserDaoInterface;
import com.sharkjob.OtherService.Encoder;
import com.sharkjob.OtherService.MailService;
import com.sharkjob.model.User;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @Autowired
    private UserDaoInterface userDao;

    @Autowired
    @Setter
    private MailService mailService;

    @RequestMapping(value = "/regUser", method = POST)
    public ResponseEntity<String> regUser(@RequestBody String newUser)
    //UriComponentsBuilder builder)
    {
        Gson gson = new Gson();
        User user = gson.fromJson(newUser, User.class);

        if (user.getEmail().trim().length() > 0 && user.getUserName().trim().length() > 0 && user.getPassword().trim().length() > 0) {
            if (userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName()) != null) {
                return new ResponseEntity<>("This username has already exists", HttpStatus.CONFLICT);
            }
            User userInTable = userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail());

            if (userInTable == null) {
                return new ResponseEntity<>("Please verify email first!", HttpStatus.CONFLICT);
            }

            if ((userInTable.getValidCode() != null) && (userInTable.getValidCode().equals(user.getValidCode()))) {

                String encodedPassword = Encoder.base64Encode(user.getPassword());
                user.setPassword(encodedPassword);
                userDao.getUserMapper().save(user);
                return new ResponseEntity<>(gson.toJson(user), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Verification Code is wrong!", HttpStatus.CONFLICT);
            }
        } else {

            return new ResponseEntity<>("Input invalid", HttpStatus.NO_CONTENT);

        }

    }

    @RequestMapping(value = "/toLogin", method = POST)
    public ResponseEntity<String> loginUser(@RequestBody String emailorusername) {
        //UriComponentsBuilder builder) {

        Gson gson = new Gson();
        User user = gson.fromJson(emailorusername, User.class);
        String encodedPassword = Encoder.base64Encode(user.getPassword());
        User userInTable;
        if (user.getEmail() != null) {
            userInTable = userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail());
        } else {
            userInTable = userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName());
        }

        if (userInTable != null) {
            if (encodedPassword.equals(userInTable.getPassword())) {
                return new ResponseEntity<>(gson.toJson(userInTable), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong password", HttpStatus.UNAUTHORIZED);
            }
        }

        return new ResponseEntity<>("No username or email", HttpStatus.UNAUTHORIZED);

    }


    @RequestMapping(value = "/{userName}/updateSkills", method = POST)
    public ResponseEntity<String> updateSkills(@PathVariable String userName,
                                               @RequestParam("skills") List<String> skills) {

        boolean updateSkill = userDao.updateSkillsInSharkJobUserTableThroughUserName(userName, skills);

        if (updateSkill) {
            return new ResponseEntity<>("Skills updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No username or email", HttpStatus.UNAUTHORIZED);
        }
    }


    @RequestMapping(value = "/verificationCode", method = POST)
    public ResponseEntity<String> sendVerificationCode(@RequestParam(value = "email") String email) {
        User regUser = userDao.findUserInSharkJobUserTableThroughEmail(email);
        if ((regUser != null) && (regUser.getUserName() != null) && (regUser.getUserType() != null)) {
            return new ResponseEntity<>("This email has already exists", HttpStatus.CONFLICT);
        }

        if ((regUser != null) && (regUser.getUserName() == null)) {
            userDao.deleteUserInSharkJobUserTable(email);
        }
        User user = new User();
        user.setEmail(email);
        String code = mailService.sendVerifcationCode(email);
        if (code == null) {
            return new ResponseEntity<>("Failed to send verification code. Please wait a moment to retry.", HttpStatus.CONFLICT);
        }
        user.setValidCode(code);
        userDao.saveUserInSharkJobUserTable(user);
        return new ResponseEntity<>("Verification Code sent!", HttpStatus.OK);
    }

    @RequestMapping(value = "/{userName}/changeEmail", method = POST)
    public ResponseEntity<String> changeEmail(@PathVariable String userName,
                                              @RequestParam(value = "newEmail", required = false) String newEmail,
                                              @RequestParam(value = "password", required = false) String password) {

        boolean changeEmail = userDao.changeEmailInSharkJobUserTableThroughUserName(userName, newEmail);

        if (changeEmail) {
            return new ResponseEntity<>("email changed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("email exists", HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{userName}/changeUserName", method = POST)
    public ResponseEntity<String> changeUserName(@PathVariable String userName,
                                                 @RequestParam(value = "password") String password,
                                                 @RequestParam(value = "newUserName") String newUserName) {

        boolean changeUserName = userDao.changeUserNameInSharkJobUserTableThroughUserName(userName, newUserName);

        if (changeUserName) {
            return new ResponseEntity<>("user name changed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("user name exists", HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{userName}/changePassword", method = POST)
    public ResponseEntity<String> changePassword(@PathVariable String userName,
                                                 @RequestParam("password") String password,
                                                 @RequestParam("newPassword") String newPassowrd) {

        boolean changePassword = userDao.changePasswordInSharkJobUserTableThroughUserName(userName, password, newPassowrd);

        if (changePassword) {
            return new ResponseEntity<>("password changed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No user", HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{userName}", method = GET)
    public ResponseEntity<User> getUserInfo(@PathVariable String userName) {
        User user = userDao.findUserInSharkJobUserTableThroughUsername(userName);
        //check if return is null
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            User nullUser = new User();
            return new ResponseEntity<>(nullUser, HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/email", method = GET)
    public ResponseEntity<User> getUserInfoThroughEmail(@RequestParam(value = "email") String userEmail) {
        User user = userDao.findUserInSharkJobUserTableThroughEmail(userEmail);
        //check if return is null
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            User nullUser = new User();
            return new ResponseEntity<>(nullUser, HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/numberOfUsers", method = GET)
    public ResponseEntity<Integer> getNumberOfUsers() {
        Integer number = userDao.getNumberofUsersInSharkUserInfoTable();
        return new ResponseEntity<>(number, HttpStatus.OK);
    }
}

