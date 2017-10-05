package com.sharkjob.controller;

import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.LinkedList;
import java.util.List;


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
        userDao.saveUserInSharkJobUserTable(user);
        log.info("user Chi saved.");
        userDao.findUserInSharkJobUserTableThroughEmail("c423liu@uwaterloo.ca");
        log.info("User Chi found.");
        userDao.deleteUserInSharkJobUserTable("c423liu@uwaterloo.ca");
        log.info("User Chi deleted.");
        //just for test...
        log.info("helloworld added");
        jobDao.createSharkJobInfoTable();
        Job job = new Job();
        List<String> skills = new LinkedList<>();
        skills.add("python");
        skills.add("c++");
        job.setJobTittle("SDE");
        job.setLocation("waterloo");
        job.setJobDescription("test");
        job.setCategories("Software");
        job.setRequiredSkills(skills);
        jobDao.saveJobInSharkJobInfoTable(job);
        jobDao.deleteJobInSharkJobInfoTable(job.getJobId());
        return "index";
    }
}