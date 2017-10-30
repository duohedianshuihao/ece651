package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Date;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@EnableWebMvc
public class JobController {
    @Autowired
    private JobDao jobDao;

    @Autowired
    private UserDao userDao;

    @RequestMapping(value = "/newJob", method = POST)
    public ResponseEntity<String> post(@RequestBody String newJob, @RequestBody String email) {

        Gson gson = new Gson();
        Job job = gson.fromJson(newJob, Job.class);

        Date date = new Date();

        job.setCompany(userDao.findUserInSharkJobUserTableThroughEmail(email));
        job.setCreatedTime(date);

        jobDao.saveJobInSharkJobInfoTable(job);

        return new ResponseEntity<>("Job saved", HttpStatus.CREATED);
    }

    @RequestMapping(value = "/updateJobInfo", method = POST)
    public void updateJobInfo(@RequestBody String jobId, @RequestBody String jobDescription) {

        jobDao.updateJobInSharkJobInfoTable(jobId, jobDescription);
    }

    @RequestMapping(value = "/jobList", method = GET)
    public ResponseEntity< List<Job> > showJobs() {
        List jobList = jobDao.getAllJobsInSharkJobInfoTable();
        if (!jobList.isEmpty()) {
            return new ResponseEntity<>(jobList, HttpStatus.OK
            );
        } else{
            return new ResponseEntity<>(jobList, HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/jobs/{jobId}", method = GET)
    public ResponseEntity< Job >  getJobInfo(@PathVariable String jobId) {
        Job job = jobDao.findJobInSharkJobInfoTableThroughJobId(jobId);
        if (job != null){
            return new ResponseEntity<>(job, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/jobsAddComment/{jobId}", method = POST)
    public void addComment(@PathVariable String jobId, @RequestBody String newComment) {

    }
}
