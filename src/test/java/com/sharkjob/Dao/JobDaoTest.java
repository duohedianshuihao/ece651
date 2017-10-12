package com.sharkjob.Dao;


import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class JobDaoTest {
    @Mock
    private AmazonDynamoDB mockAmazonDyanmoDB;
    @Mock private DynamoDBMapper mockJobMapper;
    private JobDao jobDao = new JobDao();
    private Job job = new Job();
    private User company = new User();
    private User wrongCompany = new User();
    private final String newJobDescription = "job description is updated";

    @Before
    public void setUp() throws InterruptedException {
        jobDao.setDynamoDBClient(mockAmazonDyanmoDB);
        jobDao.setJobMapper(mockJobMapper);
        when(mockJobMapper.generateCreateTableRequest(any())).thenReturn(new CreateTableRequest());
        company.setEmail("c423liu@uwaterloo.ca");
        company.setUserType("Company");
        company.setUserName("Chino");
        company.setPassword("123456");

        company.setEmail("wrong@example.com");

        Date startDate = new Date();
        Date commentDate1 = new Date();
        Date commentDate2 = new Date();

        Comment comment1 = new Comment();
        comment1.setReplier(company);
        comment1.setComment("good job");
        comment1.setCommentTime(commentDate1);
        Comment comment2 = new Comment();
        comment2.setReplier(company);
        comment2.setComment("good job");
        comment2.setCommentTime(commentDate2);
        ArrayList<Comment> comments = new ArrayList<>();
        comments.add(comment1);
        comments.add(comment2);

        job.setStartTime(startDate);
        job.setJobTittle("Software Internship");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(Arrays.asList("java", "python"));
        job.setCompany(company);
        job.setComments(comments);

    }

    @Test
    public void valid_createSharkJobInfoTable_Successfully() {
        mockJobMapper = new DynamoDBMapper(mockAmazonDyanmoDB);
        jobDao.createSharkJobInfoTable();
    }

    @Test
    public void valid_createSharkJobInfoTable_TableAlreadyExist() {
        mockJobMapper = new DynamoDBMapper(mockAmazonDyanmoDB);
        when(mockAmazonDyanmoDB.createTable(any())).thenThrow(ResourceInUseException.class);
        jobDao.createSharkJobInfoTable();
    }

    @Test
    public void saveUserInSharkJobInfoTable_Successfully() {
        when(mockJobMapper.load(Job.class,job.getJobId())).thenReturn(job);
        jobDao.saveJobInSharkJobInfoTable(job);
        verify(mockJobMapper,times(1)).save(job);
    }

    @Test
    public void valid_deleteJobInSharkJobInfoTable_Successfully() {
        when(mockJobMapper.load(Job.class,job.getJobId())).thenReturn(job);
        jobDao.deleteJobInSharkJobInfoTable(job.getJobId());
        verify(mockJobMapper,times(1)).delete(job);
    }

    @Test
    public void valid_updateJobInSharkJobInfoTable_Successfully() {
        when(mockJobMapper.load(Job.class,job.getJobId())).thenReturn(job);
        jobDao.updateJobInSharkJobInfoTable(job.getJobId(), newJobDescription);
        assertEquals(job.getJobDescription(),"job description is updated");
    }

}
