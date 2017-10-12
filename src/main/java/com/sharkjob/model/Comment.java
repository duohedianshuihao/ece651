package com.sharkjob.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Data;

import java.util.Date;

@Data
@DynamoDBDocument
public class Comment {

    @DynamoDBAttribute
    private User replier;

    @DynamoDBAttribute
    private String comment;

    @DynamoDBAttribute
    private Date commentTime;
}
