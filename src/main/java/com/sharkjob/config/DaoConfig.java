package com.sharkjob.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.JobDaoInterface;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.Dao.UserDaoInterface;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Chino on 2017/9/28.
 */
@Configuration
public class DaoConfig {

    @Bean
    public UserDaoInterface userDao() {
        UserDaoInterface userDao = new UserDao();
        return userDao;
    }

    @Bean
    public JobDaoInterface jobDao() {
        JobDaoInterface jobDao = new JobDao();
        return jobDao;
    }

}
