package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class JobDaoTest {
    @Mock
    private AmazonDynamoDB mockAmazonDyanmoDB;
    @Mock private DynamoDBMapper mockJobMapper;
    private JobDao jobDao = new JobDao();
    private Job job = new Job();

    @Before
    public void setUp() throws InterruptedException {
        jobDao.setDynamoDBClient(mockAmazonDyanmoDB);
        jobDao.setJobMapper(mockJobMapper);
        when(mockJobMapper.generateCreateTableRequest(any())).thenReturn(new CreateTableRequest());
        List<String> skills = new LinkedList<>();
        skills.add("python");
        skills.add("c++");
        job.setJobTittle("SDE");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(skills);
    }

    @Test
    public void createSharkJobInfoTable() throws Exception {
    }

    @Test
    public void saveJobInSharkJobInfoTable() throws Exception {
    }

    @Test
    public void deleteJobInSharkJobInfoTable() throws Exception {
    }

    @Test
    public void findJobInSharkJobInfoTableThroughID() throws Exception {
    }

}