package com.sharkjob.controller;

import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import com.sharkjob.model.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;


/**
 * Created by Chino on 2017/9/14.
 */
@Controller
@RequestMapping("/")
public class IndexController {
    private static final Logger log = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private UserDao userDao;
    @Autowired
    private JobDao jobDao;

    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {
        model.addAttribute("message", "Hello,world");
        //This is just test for create a table...It should be post in other class.
        //Just for test...
        userDao.createSharkJobUserTable();
        User user = new User();
        user.setEmail("c423liu@uwaterloo.ca");
        user.setUserType("Student");
        user.setUserName("Chino");
        user.setPassword("123456");
        user.setSkills(Arrays.asList("a1", "a2"));
        userDao.saveUserInSharkJobUserTable(user);
        log.info("user Chi saved.");
        userDao.findUserInSharkJobUserTableThroughEmail("c423liu@uwaterloo.ca");
        log.info("User Chi found.");
        if ( userDao.findUserInSharkJobUserTableThroughUsername("Chino") != null ){
            log.info(userDao.findUserInSharkJobUserTableThroughUsername("Chino").getUserName()+" found");
        }
        if(userDao.updateSkillsInSharkJobUserTableThroughEmail("c423liu@uwaterloo.ca", Arrays.asList("b1", "b2"))) {
            log.info("User Chi skills change: " + userDao.findUserInSharkJobUserTableThroughUsername("Chino").getSkills().toString());
        }
        userDao.deleteUserInSharkJobUserTable("c423liu@uwaterloo.ca");
        log.info("User Chi deleted.");
        if(!userDao.deleteUserInSharkJobUserTable("c423liu@uwaterloo.ca")) {
            log.info("Test for delete fail.");
        }
        if ( userDao.findUserInSharkJobUserTableThroughUsername("Chino") == null ){
            log.info("Chino not found");
        }
        //just for test...
        log.info("helloworld added");
        jobDao.createSharkJobInfoTable();
        Job job = new Job();
        Job job2 = new Job();

        List<String> skills = new LinkedList<>();
        skills.add("python");
        skills.add("c++");

        Date startDate = new Date();
        Date commentDate1 = new Date();
        Date commentDate2 = new Date();
        Date startDate2 = new Date();

        Comment comment1 = new Comment();
        comment1.setReplier(user);
        comment1.setComment("good job");
        comment1.setCommentTime(commentDate1);
        Comment comment2 = new Comment();
        comment2.setReplier(user);
        comment2.setComment("good job");
        comment2.setCommentTime(commentDate2);
        ArrayList<com.sharkjob.model.Comment> comments = new ArrayList<>();
        comments.add(comment1);
        comments.add(comment2);
        String newDescription = "description updated";

        job.setStartTime(startDate);
        job.setCreatedTime(startDate);
        job2.setCreatedTime(startDate2);
        job.setJobTittle("Software Internship");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(skills);
        job.setCompany(user);
        job.setComments(comments);
        jobDao.saveJobInSharkJobInfoTable(job);
        jobDao.saveJobInSharkJobInfoTable(job2);
        jobDao.updateJobInSharkJobInfoTable(job.getJobId(), newDescription);
        jobDao.addCommentInSharkJobInfoTable(job.getJobId(), comment2);
        List<Job> jobs = jobDao.getAllJobsInSharkJobInfoTable();
        log.info(jobs.get(0).toString()+jobs.get(1).toString());

        
//        jobDao.deleteJobInSharkJobInfoTable(job.getJobId());
        return "index";
    }
}