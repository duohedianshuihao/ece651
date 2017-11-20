package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import lombok.val;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class JobControllerTest {
    @Mock
    private JobDao jobDao;
    @Mock
    private UserDao userDao;
    @InjectMocks
    private JobController jobController;
    private static String newJob;
    private static String email;
    private String newComment;
    private Job job = new Job();
    private Job job2 = new Job();
    private List<Job> jobs = new ArrayList<>();
    private List<Job> jobs2 = new ArrayList<>();
    List <Job> resultList = new LinkedList<>();
    private User company = new User();
    private Comment comment = new Comment();
    private Gson gson = new Gson();
    private Integer number;

    @Before
    public void setUp(){
        company.setEmail("c423liu@uwaterloo.ca");
        company.setUserType("Company");
        company.setUserName("Chino");
        company.setPassword("123456");
        job.setJobTittle("Software Internship");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(Arrays.asList("java", "python"));
        job.setCompany(company);
        newJob = gson.toJson(job);
        email = gson.toJson(company.getEmail());

        job2.setJobTittle("Software PartTime");
        job2.setLocation("toronto");
        job2.setJobDescription("test2");
        job2.setCategories("Software");
        job2.setRequiredSkills(Arrays.asList("c++", "python"));
        job2.setCompany(company);

        jobs.add(job);
        jobs.add(job2);

        number = 2;

        newComment = "a new comment";
    }

//    @Test
//    public void valid_post_save_successfully(){
//        val expected = new ResponseEntity<>(newJob, HttpStatus.CREATED);
//        val actual = jobController.post(newJob);
////        assertEquals(expected,actual);
//        verify(jobDao,times(1)).saveJobInSharkJobInfoTable(any());
//    }

    @Test
    public void valid_updateJobInfo_successfully() {
        val expected = new ResponseEntity<>(newJob, HttpStatus.OK);
        when(jobDao.updateJobInSharkJobInfoTable(job)).thenReturn(true);
        when(jobDao.findJobInSharkJobInfoTableThroughJobId(job.getJobId())).thenReturn(job);
        val actual = jobController.updateJobInfo(newJob);
        assertEquals(expected,actual);
    }

    @Test
    public void valid_updateJobInfo_unsuccessfully() {
        val expected = new ResponseEntity<>("job not existing", HttpStatus.UNAUTHORIZED);
        when(jobDao.updateJobInSharkJobInfoTable(job)).thenReturn(false);
        val actual = jobController.updateJobInfo(newJob);
        assertEquals(expected,actual);
    }

    @Test
    public void valid_showJob_successfully() {
        val expected = new ResponseEntity<>(jobs, HttpStatus.OK);
        when(jobDao.getAllJobsInSharkJobInfoTable()).thenReturn(jobs);
        val actual = jobController.showJobs();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_showJob_successfully2() {
        val expected = new ResponseEntity<>(jobs2, HttpStatus.NO_CONTENT);
        when(jobDao.getAllJobsInSharkJobInfoTable()).thenReturn(jobs2);
        val actual = jobController.showJobs();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getJobInfo_successfully() {
        val expected = new ResponseEntity<>(job, HttpStatus.OK);
        when(jobDao.findJobInSharkJobInfoTableThroughJobId(job.getJobId())).thenReturn(job);
        val actual = jobController.getJobInfo(job.getJobId());
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getJobInfo_unsuccessfully() {
        val expected = new ResponseEntity<>(new Job(), HttpStatus.NO_CONTENT);
        when(jobDao.findJobInSharkJobInfoTableThroughJobId(job.getJobId())).thenReturn(null);
        val actual = jobController.getJobInfo(job.getJobId());
        assertEquals(expected,actual);
    }

    @Test
    public void valid_searchEngine_with_result() {
        resultList.add(job);
        resultList.add(job2);
        val expected = new ResponseEntity<>(resultList, HttpStatus.OK);
        when(jobDao.getAllJobsInSharkJobInfoTable()).thenReturn(jobs);
        val actual = jobController.searchEngine("Software");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_searchEngine_no_result() {
        val expected = new ResponseEntity<>(resultList, HttpStatus.NO_CONTENT);
        when(jobDao.getAllJobsInSharkJobInfoTable()).thenReturn(jobs);
        val actual = jobController.searchEngine("hardware");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_addComment_successfully() {
        val expected = new ResponseEntity<>("Comment saved", HttpStatus.OK);
        when(userDao.findUserInSharkJobUserTableThroughUsername(company.getUserName())).thenReturn(company);
        val actual = jobController.addComment(job.getJobId(),company.getUserName(),"a new comment");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_addComment_invalid() {
        val expected = new ResponseEntity<>("Fake User", HttpStatus.NO_CONTENT);
        when(userDao.findUserInSharkJobUserTableThroughUsername("Lynn")).thenReturn(null);
        val actual = jobController.addComment(job.getJobId(),"Lynn","a new comment");
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getNumberOfJobs() {
        val expected = new ResponseEntity<>(number, HttpStatus.OK);
        when(jobDao.getNumberOfJobsInSharkJobInfoTable()).thenReturn(number);
        val actual = jobController.getNumberOfJobs();
        assertEquals(expected,actual);
    }
}
