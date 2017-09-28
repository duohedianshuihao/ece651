package com.sharkjob.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Data;

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