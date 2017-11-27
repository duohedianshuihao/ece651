package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.OtherService.Encoder;
import com.sharkjob.model.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Chino on 2017/11/27.
 */
public interface UserDaoInterface {
    public void createSharkJobUserTable();

    public boolean saveUserInSharkJobUserTable(User user);

    public boolean deleteUserInSharkJobUserTable(String email);

    public User findUserInSharkJobUserTableThroughEmail(String email);

    public User findUserInSharkJobUserTableThroughUsername(String username);

    public boolean updateSkillsInSharkJobUserTableThroughEmail(String email, List<String> skills);

    public boolean updateSkillsInSharkJobUserTableThroughUserName(String userName, List<String> skills);

    public boolean changeEmailInSharkJobUserTableThroughUserName(String userName, String email);

    public boolean changeUserNameInSharkJobUserTableThroughUserName(String userName, String newUserName);

    public boolean changePasswordInSharkJobUserTableThroughUserName(String userName, String password, String newPassword);

    public int getNumberofUsersInSharkUserInfoTable();

    public boolean isRightUser(String userName, String password);

    public DynamoDBMapper getUserMapper();
}
