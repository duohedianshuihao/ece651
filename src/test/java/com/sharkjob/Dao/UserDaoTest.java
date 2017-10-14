package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import static org.mockito.Matchers.any;
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
    private UserDao userDao = new UserDao();
    private User user = new User();
    private final String email = "c423liu@uwaterloo.ca";
    private final List<String> skills = Arrays.asList("a1", "a2");

    @Before
    public void setUp() throws InterruptedException {
        userDao.setDynamoDBClient(mockAmazonDyanmoDB);
        userDao.setUserMapper(mockUserMapper);
        when(mockUserMapper.generateCreateTableRequest(any())).thenReturn(new CreateTableRequest());
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

}