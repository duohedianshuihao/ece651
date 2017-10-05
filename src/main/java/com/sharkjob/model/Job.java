package com.sharkjob.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Data;

import java.util.LinkedList;

@Data
@DynamoDBTable(tableName = "SharkJobInfo")
public class Job {

    @DynamoDBHashKey(attributeName = "jobId")
    @DynamoDBAutoGeneratedKey
    private String ID;//auto generate

    @DynamoDBAttribute(attributeName = "jobTittle")
    private String jobTittle;

    @DynamoDBAttribute(attributeName = "jobDescription")
    private String jobDescription;

    @DynamoDBAttribute(attributeName = "userName")
    private String userName;//another key?

    @DynamoDBAttribute(attributeName = "requiredSkills")
    private LinkedList<String> requiredSkills;

    @DynamoDBAttribute(attributeName = "startTime")
    private String startTime;///?Date

    @DynamoDBAttribute(attributeName = "expirTime")
    private String expirTime;////?

    @DynamoDBAttribute(attributeName = "location")
    private String location;

    @DynamoDBAttribute(attributeName = "categories")
    private String categories;// a table?
}
