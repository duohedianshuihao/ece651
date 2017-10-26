package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class JobController {
    @Autowired
    private JobDao jobDao;

    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "newJob", method = POST)
    public ResponseEntity<String> post(@RequestBody String newJob, @RequestParam String email) {

        Gson gson = new Gson();
        Job job = gson.fromJson(newJob, Job.class);

        Date date = new Date();

        job.setCompany(userDao.findUserInSharkJobUserTableThroughEmail(email));
        job.setCreatedTime(date);

        jobDao.saveJobInSharkJobInfoTable(job);

        return new ResponseEntity<>("Job saved", HttpStatus.CREATED);
    }

    @RequestMapping(value = "updateJobInfo", method = POST)
    public void updateJobInfo(@RequestParam String jobId, @RequestParam String jobDescription) {

        jobDao.updateJobInSharkJobInfoTable(jobId, jobDescription);
    }

    @RequestMapping(value = "jobs", method = GET)
    public List<Job> showJobsTittle() {

        return jobDao.getAllJobsInSharkJobInfoTable();
    }

    @RequestMapping(value = "jobs/{jobId}", method = GET)
    public Job getJobInfo(@RequestParam String jobId) {

        return jobDao.findJobInSharkJobInfoTableThroughJobId(jobId);
    }

    @RequestMapping(value = "jobs/{jobId}", method = POST)
    public void addComment(@RequestParam String jobId, @RequestParam String newComment) {

    }
}
