package com.sharkjob.controller;

import com.google.gson.Gson;
import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.*;
import java.util.stream.Collectors;

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
    public ResponseEntity<String> post(@RequestParam(value = "newJob") String newJob,
                                       @RequestParam(value = "email") String email) {

        Gson gson = new Gson();
        Job job = gson.fromJson(newJob, Job.class);

        Date date = new Date();

        job.setCompany(userDao.findUserInSharkJobUserTableThroughEmail(email));
        job.setCreatedTime(date);

        jobDao.saveJobInSharkJobInfoTable(job);

        return new ResponseEntity<>("Job saved", HttpStatus.CREATED);
    }

    @RequestMapping(value = "/updateJobInfo", method = POST)
    public void updateJobInfo(@RequestParam(value = "jobId") String jobId,
                               @RequestParam(value = "jobDescription") String jobDescription) {

        jobDao.updateJobInSharkJobInfoTable(jobId, jobDescription);
    }

    @RequestMapping(value = "/jobList", method = GET)
    public ResponseEntity< List<Job> > showJobs() {
        List jobList = jobDao.getAllJobsInSharkJobInfoTable();
        if (!jobList.isEmpty()) {
            return new ResponseEntity<>(jobList, HttpStatus.OK);
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
    /*Situation of Content
    1. Job Tittle;
    2. Skills;
    3. Location;
    */
    @RequestMapping(value = "/searchEngine", method = GET)
    public ResponseEntity< List<Job> > searchEngine(@RequestParam String content) {
        String[] parameter = content.split(" ");
        List<Job> jobList = jobDao.getAllJobsInSharkJobInfoTable();
        List <Job> resultList = new LinkedList<>();
        for(val job:jobList){
            for (val param:parameter) {
                if (job.getJobTittle().toLowerCase().contains(param.toLowerCase())
                    || job.getRequiredSkills().contains(param)
                    || job.getRequiredSkills().contains(param.toLowerCase())
                    || job.getRequiredSkills().contains(param.toUpperCase())
                    || job.getLocation().toLowerCase().contains(param.toLowerCase())){

                    resultList.add(job);
                }
            }
        }
        if (!resultList.isEmpty()) {
            return new ResponseEntity<>(resultList, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(resultList, HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/jobAddComments/{jobId}", method = POST)
    public ResponseEntity<String> addComment(@PathVariable String jobId,
                                             @RequestParam(value = "currentUser") String userName,
                                             @RequestParam(value = "comment") String newComment) {

        User replier = userDao.findUserInSharkJobUserTableThroughUsername(userName);
        if(replier != null) {
            Comment comment = new Comment();
            comment.setComment(newComment);
            comment.setReplier(replier);
            Date commentDate = new Date();
            comment.setCommentTime(commentDate);
            jobDao.addCommentInSharkJobInfoTable(jobId,comment);
            return new ResponseEntity<>("Comment saved", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Fake User", HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value ="/numberOfJobs", method = GET)
    public ResponseEntity<Integer> getNumberOfJobs() {
        Integer number = jobDao.getNumberOfJobsInSharkJobInfoTable();

        return new ResponseEntity<>(number, HttpStatus.OK);
    }
}
