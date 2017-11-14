package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.User;
import lombok.val;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by Chino on 2017/10/26.
 */
@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {
    @Mock
    private UserDao userDao;
    @InjectMocks
    private UserController userController;
    private static String newUser;
    private User user = new User();
    private User nullUser = new User();
    private User userLogin = new User();
    private Gson gson = new Gson();
    private List newSkills = new ArrayList();
    private Integer number;

    @Before
    public void setUp(){
        user.setEmail("c423liu@uwaterloo.ca");
        user.setUserName("Chino");
        user.setPassword("123456");
        user.setUserType("student");
        userLogin.setEmail(user.getEmail());
        userLogin.setUserName(user.getUserName());
        userLogin.setPassword(user.getPassword());
        List listSkills = new LinkedList<>();
        listSkills.add("Python");
        listSkills.add("C++");
        user.setSkills(listSkills);
        newUser = gson.toJson(user);

        newSkills.add("Java");
        newSkills.add("Python");
        number = 2;
    }

    @Test
    public void vaild_regUser_save_successfully(){
        val expected = new ResponseEntity<>(gson.toJson(user), HttpStatus.CREATED);
        when(userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail())).thenReturn(null);
        when(userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName())).thenReturn(null);
        val  actual = userController.regUser(newUser);
        assertEquals(expected, actual);
        verify(userDao,times(1)).saveUserInSharkJobUserTable(any());
    }

    @Test
    public void vaild_regUser_username_conflict(){
        val expected = new ResponseEntity<>("This username has already exists",HttpStatus.CONFLICT);
        when(userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail())).thenReturn(null);
        when(userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName())).thenReturn(new User());
        val  actual = userController.regUser(newUser);
        assertEquals(expected, actual);
        verify(userDao,times(0)).saveUserInSharkJobUserTable(any());
    }

    @Test
    public void vaild_regUser_email_conflict(){
        val expected = new ResponseEntity<>("This email has already exists",HttpStatus.CONFLICT);
        when(userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail())).thenReturn(new User());
        when(userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName())).thenReturn(null);
        val  actual = userController.regUser(newUser);
        assertEquals(expected, actual);
        verify(userDao,times(0)).saveUserInSharkJobUserTable(any());
    }

    @Test
    public void vaild_regUser_invalid(){
        val expected = new ResponseEntity<>("Input invalid",HttpStatus.NO_CONTENT);
        user.setEmail("");
        newUser = gson.toJson(user);
        System.out.println(user.getEmail().trim().length());
        when(userDao.findUserInSharkJobUserTableThroughEmail(user.getEmail())).thenReturn(new User());
        when(userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName())).thenReturn(null);
        val  actual = userController.regUser(newUser);
        assertEquals(expected, actual);
        verify(userDao,times(0)).saveUserInSharkJobUserTable(any());
    }

    @Test
    public void vaild_loginUser_through_email_successfully(){
        val expected = new ResponseEntity<>(gson.toJson(userLogin),HttpStatus.OK);
        newUser = gson.toJson(userLogin);
        when(userDao.findUserInSharkJobUserTableThroughEmail(userLogin.getEmail())).thenReturn(userLogin);
        val actual = userController.loginUser(newUser);
        assertEquals(expected, actual);
    }
    @Test
    public void vaild_loginUser_through_userName_successfully(){
        userLogin.setEmail(null);
        val expected = new ResponseEntity<>(gson.toJson(userLogin),HttpStatus.OK);
        newUser = gson.toJson(userLogin);
        when(userDao.findUserInSharkJobUserTableThroughUsername(userLogin.getUserName())).thenReturn(userLogin);
        val actual = userController.loginUser(newUser);
        assertEquals(expected, actual);
    }

    @Test
    public void vaild_loginUser_password_uncorrect(){
        val expected = new ResponseEntity<>("Wrong password",HttpStatus.UNAUTHORIZED);
        when(userDao.findUserInSharkJobUserTableThroughEmail(any())).thenReturn(user);
        userLogin.setPassword("8872");
        newUser = gson.toJson(userLogin);
        val actual = userController.loginUser(newUser);
        assertEquals(expected, actual);
    }

    @Test
    public void vaild_loginUser_no_user(){
        val expected = new ResponseEntity<>("No username or email",HttpStatus.UNAUTHORIZED);
        newUser = gson.toJson(userLogin);
        when(userDao.findUserInSharkJobUserTableThroughUsername(any())).thenReturn(null);
        val actual = userController.loginUser(newUser);
        assertEquals(expected, actual);
    }

    @Test
    public void vaild_updateSkills_successfully() {
        val expected = new ResponseEntity<>("Skills updated",HttpStatus.OK);
        when(userDao.updateSkillsInSharkJobUserTableThroughUserName(user.getUserName(),newSkills)).thenReturn(true);
        val actual = userController.updateSkills("Chino",newSkills);
        assertEquals(expected,actual);
    }

    @Test
    public void valid_updateSkills_invalid_user() {
        val expected = new ResponseEntity<>("No username or email",HttpStatus.UNAUTHORIZED);
        when(userDao.updateSkillsInSharkJobUserTableThroughUserName("Lynn",newSkills)).thenReturn(false);
        val actual = userController.updateSkills("Lynn",newSkills);
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changeEmail_successfully() {
        val expected = new ResponseEntity<>("email changed",HttpStatus.OK);
        when(userDao.changeEmailInSharkJobUserTableThroughUserName(user.getUserName(),user.getPassword(),"change@example.com")).thenReturn(true);
        val actual = userController.changeEmail("Chino", "change@example.com", "123456");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changeEmail_invalid_user() {
        val expected = new ResponseEntity<>("No user",HttpStatus.UNAUTHORIZED);
        when(userDao.changeEmailInSharkJobUserTableThroughUserName("Lynn","123456","change@example.com")).thenReturn(false);
        val actual = userController.changeEmail("Lynn", "change@example.com", "123456");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changeUserName_successfully() {
        val expected = new ResponseEntity<>("user name changed",HttpStatus.OK);
        when(userDao.changeUserNameInSharkJobUserTableThroughUserName(user.getUserName(),user.getPassword(),"newName")).thenReturn(true);
        val actual = userController.changeUserName("Chino","123456","newName");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changeUserName_invalid_user() {
        val expected = new ResponseEntity<>("No user",HttpStatus.UNAUTHORIZED);
        when(userDao.changeUserNameInSharkJobUserTableThroughUserName("Lynn","123456","newName")).thenReturn(false);
        val actual = userController.changeUserName("Lynn","123456","newName");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changePassword_successfully() {
        val expected = new ResponseEntity<>("password changed",HttpStatus.OK);
        when(userDao.changePasswordInSharkJobUserTableThroughUserName(user.getUserName(),user.getPassword(),"1234567")).thenReturn(true);
        val actual = userController.changePassword("Chino","123456","1234567");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_changePassword_invalid_user() {
        val expected = new ResponseEntity<>("No user",HttpStatus.UNAUTHORIZED);
        when(userDao.changePasswordInSharkJobUserTableThroughUserName("Lynn","123456","1234567")).thenReturn(false);
        val actual = userController.changePassword("Lynn","123456","newName");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getUserInfo_successfully() {
        val expected = new ResponseEntity<>(user, HttpStatus.OK);
        when(userDao.findUserInSharkJobUserTableThroughUsername(user.getUserName())).thenReturn(user);
        val actual = userController.getUserInfo("Chino");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getUserInfo_no_user() {
        val expected = new ResponseEntity<>(nullUser, HttpStatus.NO_CONTENT);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Lynn")).thenReturn(null);
        val actual = userController.getUserInfo("Lynn");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getNumberOfUser_successfully() {
        val expected = new ResponseEntity<>(number, HttpStatus.OK);
        when(userDao.getNumberofUsersInSharkUserInfoTable()).thenReturn(number);
        val actual = userController.getNumberOfUsers();
        assertEquals(expected,actual);
    }

}