package com.sharkjob.Dao;


import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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
    @Mock private  PaginatedScanList mockPaginatedScanList;
    private List<Job> jobs;
    private JobDao jobDao = new JobDao();
    private Job job = new Job();
    private Job newJob = new Job();
    private User company = new User();
    private User wrongCompany = new User();
    private User company2 = new User();
    private final String newJobDescription = "job description is updated";
    private Comment newComment = new Comment();
//    private List<job>


    @Before
    public void setUp() throws InterruptedException {
        jobDao.setDynamoDBClient(mockAmazonDyanmoDB);
        jobDao.setJobMapper(mockJobMapper);
        when(mockJobMapper.generateCreateTableRequest(any())).thenReturn(new CreateTableRequest());
        company.setEmail("c423liu@uwaterloo.ca");
        company.setUserType("Company");
        company.setUserName("Chino");
        company.setPassword("123456");

        wrongCompany.setEmail("wrong@example.com");

        Date startDate = new Date();
        Date commentDate1 = new Date();
        Date commentDate2 = new Date();
        Date createdDate1 = new Date();
        Date createdDate2 = new Date(createdDate1.getTime() + 1);

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

        company2.setEmail("company2@uwaterloo.ca");
        company2.setUserType("Company");
        company2.setUserName("company2");
        company2.setPassword("123456");

        job.setCreatedTime(createdDate1);
        job.setStartTime(startDate);
        job.setJobTittle("Software Internship");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(Arrays.asList("java", "python"));
        job.setCompany(company);
        job.setComments(comments);

        newJob.setCreatedTime(createdDate2);
        newJob.setCompany(company2);

        Date newCommentTime = new Date();
        newComment.setReplier(company);
        newComment.setComment("a new comment");
        newComment.setCommentTime(newCommentTime);

        mockPaginatedScanList.add(job);
        mockPaginatedScanList.add(newJob);

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
    public void saveJobInSharkJobInfoTable_Successfully() {
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

//    @Test
//    public void valid_updateJobInSharkJobInfoTable_Successfully() {
//        when(mockJobMapper.load(Job.class,job.getJobId())).thenReturn(job);
//        jobDao.updateJobInSharkJobInfoTable(job.getJobId(), );
//        assertEquals(job.getJobDescription(),"job description is updated");
//    }

    @Test
    public void valid_addCommentInSharkJobInfoTable_Successfully() {
        when(mockJobMapper.load(Job.class,job.getJobId())).thenReturn(job);
        jobDao.addCommentInSharkJobInfoTable(job.getJobId(), newComment);
        assertEquals(job.getComments().get(2).getComment(),"a new comment");
    }

    @Test
    public void valid_addCommentInSharkJobInfoTable_Successfully2() {
        when(mockJobMapper.load(Job.class,newJob.getJobId())).thenReturn(newJob);
        jobDao.addCommentInSharkJobInfoTable(newJob.getJobId(), newComment);
        assertEquals(newJob.getComments().get(0).getComment(),"a new comment");
    }


//    @Test
//    public void vaild_getAllJobsInSharkInfoTable() {
//        when(mockJobMapper.scan(any(),any())).thenReturn(mockPaginatedScanList);
//        jobs = jobDao.getAllJobsInSharkJobInfoTable();
////        assertEquals(mockPaginatedScanList.indexOf(job), 1);
//        assertEquals(jobs.indexOf(newJob), 0);
//    }

}
