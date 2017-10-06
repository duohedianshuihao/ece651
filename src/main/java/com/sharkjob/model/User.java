package com.sharkjob.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Data;

import java.util.List;

@Data
@DynamoDBTable(tableName = "SharkJobUser")
@DynamoDBDocument
public class User {

    //Only user can edit his own Profile and data.
    //Use hash key is enough.
    //Version attribute has been disabled. But it should be used in the other table to reduce the race condition.

    @DynamoDBHashKey
    private String email;

    @DynamoDBAttribute(attributeName = "userType")
    private String userType;

    @DynamoDBAttribute(attributeName = "userName")
    private String userName;

    @DynamoDBAttribute(attributeName = "skills")
    private List<String> skills;

    @DynamoDBAttribute(attributeName = "password")
    private String password;//(This should be encryption)

}