package com.sharkjob.message;

import lombok.Data;

import java.util.Date;

@Data
public class Message {
    private String content;
    private Date time;
    private String sender;
}
