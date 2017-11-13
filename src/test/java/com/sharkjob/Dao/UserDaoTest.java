package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;

import static org.mockito.Matchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Chino on 2017/9/28.
 */
@RunWith(MockitoJUnitRunner.class)
public class UserDaoTest {
    @Mock
    private AmazonDynamoDB mockAmazonDyanmoDB;
    @Mock private DynamoDBMapper mockUserMapper;
    @Mock private  PaginatedScanList mockPaginatedScanList;
    private UserDao userDao = new UserDao();
    private User user = new User();
    private final String email = "c423liu@uwaterloo.ca";
    private final List<String> skills = Arrays.asList("a1", "a2");

    @Before
    public void setUp() throws InterruptedException {
        userDao.setDynamoDBClient(mockAmazonDyanmoDB);
        userDao.setUserMapper(mockUserMapper);
        when(mockUserMapper.generateCreateTableRequest(any())).thenReturn(new CreateTableRequest());
        when(mockUserMapper.scan(any(),any())).thenReturn(mockPaginatedScanList);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chinohoo")).thenReturn(null);
        user.setEmail("c423liu@uwaterloo.ca");
        user.setUserType("Student");
        user.setUserName("Chino");
        user.setPassword("123456");
        user.setSkills(Arrays.asList("a1", "a2"));

    }

    @Test
    public void valid_createSharkJobUserTable_Successfully() {
        mockUserMapper = new DynamoDBMapper(mockAmazonDyanmoDB);
        userDao.createSharkJobUserTable();
    }

    @Test
    public void valid_createSharkJobUserTable_TableAlreadyExist() {
        mockUserMapper = new DynamoDBMapper(mockAmazonDyanmoDB);
        when(mockAmazonDyanmoDB.createTable(any())).thenThrow(ResourceInUseException.class);
        userDao.createSharkJobUserTable();
    }

    @Test
    public void valid_saveUserInSharkJobUserTable_Successfully() {
        when(mockUserMapper.load(User.class,email)).thenReturn(null);
        boolean flag = userDao.saveUserInSharkJobUserTable(user);
        assertTrue(flag);
    }
    @Test
    public void valid_saveUserInSharkJobUserTable_Unsuccessfully() {
        when(mockUserMapper.load(User.class,email)).thenReturn(user);
        boolean flag = userDao.saveUserInSharkJobUserTable(user);
        assertFalse(flag);
    }

    @Test
    public void valid_deleteUserInSharkJobUserTable_Successfully() {
        when(mockUserMapper.load(User.class,email)).thenReturn(user);
        boolean flag = userDao.deleteUserInSharkJobUserTable(email);
        assertTrue(flag);
//        userDao.deleteUserInSharkJobUserTable(email);
//        verify(mockUserMapper, times(1)).delete(user);
    }

    @Test
    public void valid_deleteUserInSharkJobUserTable_Unsuccessfully() {
        when(mockUserMapper.load(User.class,"")).thenReturn(null);
        boolean flag = userDao.deleteUserInSharkJobUserTable("");
        assertFalse(flag);
    }

    @Test
    public void valid_findUserInSharkJobUserTableThroughEmail() {
        userDao.findUserInSharkJobUserTableThroughEmail(email);
        verify(mockUserMapper, times(1)).load(User.class, user.getEmail());
    }

    @Test
    public void valid_updateSkillsInSharkJobUserTableThroughEmail_Successfully() {
        when(mockUserMapper.load(User.class,email)).thenReturn(user);
        boolean flag = userDao.updateSkillsInSharkJobUserTableThroughEmail(email, skills);
        assertTrue(flag);
    }

    @Test
    public void valid_updateSkillsInSharkJobUserTableThroughEmail_Unsuccessfully() {
        when(mockUserMapper.load(User.class,"")).thenReturn(null);
        boolean flag = userDao.updateSkillsInSharkJobUserTableThroughEmail("", skills);
        assertFalse(flag);
    }

    @Test
    public void vaild_changeEmailInSharkJobUserTableThroughUserName(){
        mockPaginatedScanList.add(user);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Noying")).thenReturn(user);
        boolean flag = userDao.changeEmailInSharkJobUserTableThroughUserName("Noying","22222","adssa");
        assertFalse(flag);
    }
    @Test
    public void vaild_changeEmailInSharkJobUserTableThroughUserName2(){
        mockPaginatedScanList.add(user);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(user);
        boolean flag = userDao.changeEmailInSharkJobUserTableThroughUserName("Chino","123456","c423liu@uwaterloo.ca");
        assertTrue(flag);
    }
    @Test
    public void vaild_changePasswordInSharkJobUserTableThroughUserName(){
        mockPaginatedScanList.add(user);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(user);
        boolean flag = userDao.changePasswordInSharkJobUserTableThroughUserName("Chino","123456","12345678");
        assertTrue(flag);
    }
    @Test
    public void vaild_changePasswordInSharkJobUserTableThroughUserName2(){
        mockPaginatedScanList.add(user);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(user);
        boolean flag = userDao.changePasswordInSharkJobUserTableThroughUserName("Chino","12456","12345678");
        assertFalse(flag);
    }

    @Test
    public void vaild_changeUserNameInSharkJobUserTableThroughUserName(){
        mockPaginatedScanList.add(user);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(user);
        boolean flag = userDao.changeUserNameInSharkJobUserTableThroughUserName("Chino","123456","Chino");
        assertFalse(flag);
    }

    @Test
    public void valid_updateSkillsThourghUserName(){
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(user);
        boolean flag = userDao.updateSkillsInSharkJobUserTableThroughUserName("Chino", skills);
        assertTrue(flag);
    }
    @Test
    public void valid_updateSkillsThourghUserName2(){
        when(userDao.findUserInSharkJobUserTableThroughUsername("Chino")).thenReturn(null);
        boolean flag = userDao.updateSkillsInSharkJobUserTableThroughUserName("Chino", skills);
        assertFalse(flag);
    }
}