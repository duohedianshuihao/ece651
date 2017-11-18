package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.*;
import com.sharkjob.OtherService.Encoder;
import com.sharkjob.controller.IndexController;
import com.sharkjob.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;


/**
 * Created by Chino on 2017/9/28.
 */
@Data
public class UserDao {

    @Autowired
    private AmazonDynamoDB dynamoDBClient;

    @Autowired
    private DynamoDBMapper userMapper;


    private static final Logger log = LoggerFactory.getLogger(UserDao.class);

    public void createSharkJobUserTable(){
        try {
            CreateTableRequest req = userMapper.generateCreateTableRequest(User.class);
            // Table provision throughput is still required since it cannot be specified in your POJO
            req.setProvisionedThroughput(new ProvisionedThroughput(5L, 5L));
            // Fire off the CreateTableRequest using the low-level client
            dynamoDBClient.createTable(req);
        } catch (ResourceInUseException e) {
            //swallow
            log.info("User Table has already exist.");
            log.info("Number of users in table:"+getNumberofUsersInSharkUserInfoTable());
        }
    }

    public boolean saveUserInSharkJobUserTable(User user) {
        if (findUserInSharkJobUserTableThroughEmail(user.getEmail()) == null) {
            userMapper.save(user);
            return true;
        }
        else {
            return false;
            //ask user to change an email...
        }
    }

    public boolean deleteUserInSharkJobUserTable(String email){
        User user = findUserInSharkJobUserTableThroughEmail(email);
        if(user == null) {
            return false;
        }
        userMapper.delete(user);
        return true;
    }

    public User findUserInSharkJobUserTableThroughEmail(String email){
        //check email
        log.info(email);
        User user = userMapper.load(User.class, email);
        if (user != null) {
            log.info(user.toString());
        }
        return user;
    }

    public User findUserInSharkJobUserTableThroughUsername(String username) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(username));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("userName = :v1")
                .withExpressionAttributeValues(eav);

        List<User> result = userMapper.scan(User.class, scanExpression);

        if (result.isEmpty()) {
            return null;
        }
        else {
            return result.get(0);
        }

    }

    public boolean updateSkillsInSharkJobUserTableThroughEmail(String email, List<String> skills) {

        User user = userMapper.load(User.class, email);
        if (user == null) {
            return false;
        }
        user.setSkills(skills);
        userMapper.save(user);

        return true;

    }

    public boolean updateSkillsInSharkJobUserTableThroughUserName(String userName, List<String> skills) {

        User user = findUserInSharkJobUserTableThroughUsername(userName);
        if (user == null) {
            return false;
        }
        user.setSkills(skills);
        userMapper.save(user);

        return true;

    }

    public boolean changeEmailInSharkJobUserTableThroughUserName(String userName, String email) {
        User user = findUserInSharkJobUserTableThroughUsername(userName);
        if (isUniqueEmail(email)) {
            userMapper.delete(user);
            user.setEmail(email);
            userMapper.save(user);
            return true;
        }
        return false;
    }

    public boolean changeUserNameInSharkJobUserTableThroughUserName(String userName, String newUserName) {
        User user = findUserInSharkJobUserTableThroughUsername(userName);
        if (isUniqueUserName(newUserName)) {
            user.setUserName(newUserName);
            userMapper.save(user);
            return true;
        }
        return false;
    }

    public boolean changePasswordInSharkJobUserTableThroughUserName(String userName, String password, String newPassword) {
        User user = findUserInSharkJobUserTableThroughUsername(userName);
        if ( isRightUser(userName, password) ) {
            String newEncodedPassword = Encoder.base64Encode(newPassword);
            user.setPassword(newEncodedPassword);
            userMapper.save(user);
            return true;
        }
        return false;
    }

    public int getNumberofUsersInSharkUserInfoTable() {

        return userMapper.count(User.class, new DynamoDBScanExpression());
    }

    public boolean isRightUser(String userName, String password) {
        User user = findUserInSharkJobUserTableThroughUsername(userName);
        String encodedPassword = Encoder.base64Encode(password);
        if (user != null){
            return user.getPassword().equals(encodedPassword);
        }else {
            return false;
        }
    }

    private boolean isUniqueEmail(String email) {
        User user = findUserInSharkJobUserTableThroughEmail(email);
        return user == null;
    }

    private boolean isUniqueUserName(String userName) {
        User user = findUserInSharkJobUserTableThroughUsername(userName);
        return user == null;
    }


}
