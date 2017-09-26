package com.sharkjob.model;


import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.ScalarAttributeType;
import lombok.Data;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;

@Data
@DynamoDBTable(tableName = "SharkJobUser")
public class User {

    @DynamoDBHashKey
    private String email;

    @DynamoDBRangeKey
    private String userType;

    @DynamoDBVersionAttribute
    private long version;

    @DynamoDBAttribute(attributeName = "userName")
    private String userName;

    @DynamoDBAttribute(attributeName = "skills")
    private String skills;

    @DynamoDBAttribute(attributeName = "password")
    private String password;

}
