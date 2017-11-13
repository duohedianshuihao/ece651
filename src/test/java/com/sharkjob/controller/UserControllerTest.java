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
    private User userLogin = new User();
    private Gson gson = new Gson();

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

}