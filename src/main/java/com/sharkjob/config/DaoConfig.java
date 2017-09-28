package com.sharkjob.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.sharkjob.Dao.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Chino on 2017/9/28.
 */
@Configuration
public class DaoConfig {
    @Bean
    public UserDao userDao(){
        UserDao userDao = new UserDao();
        return userDao;
    }
}
