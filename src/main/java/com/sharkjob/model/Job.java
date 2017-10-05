package com.sharkjob.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Data;

@Data
@DynamoDBTable(tableName = "SharkJobInfo")
public class Job {


    @DynamoDBHashKey
    private Integer ID;

    @DynamoDBAttribute(attributeName = "jobTittle")
    private String jobTittle;

    @DynamoDBAttribute(attributeName = "jobDescription")
    private String jobDescription;

    @DynamoDBAttribute(attributeName = "userName")
    private String userName;//another key?

    @DynamoDBAttribute(attributeName = "requiredSkills")
    private String requiredSkills;

    @DynamoDBAttribute(attributeName = "startTime")
    private String startTime;

    @DynamoDBAttribute(attributeName = "expirTime")
    private String expirTime;

    @DynamoDBAttribute(attributeName = "location")
    private String location;

    @DynamoDBAttribute(attributeName = "categories")
    private String categories;// a table?
}
