package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.JobDao;
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

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class JobControllerTest {
    @Mock
    private JobDao jobDao;
    @InjectMocks
    private JobController jobController;
    private static String newJob;
    private static String email;
    private Job job = new Job();
    private User company = new User();
    private Gson gson = new Gson();

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
    }

    @Test
    public void valid_post_save_successfully(){
//        val expected = new ResponseEntity<>(gson.toJson(job), HttpStatus.CREATED);
//        val  actual = jobController.post(newJob, email);
////        assertEquals(expected, actual);
//        verify(jobDao,times(1)).saveJobInSharkJobInfoTable(any());
    }
}
