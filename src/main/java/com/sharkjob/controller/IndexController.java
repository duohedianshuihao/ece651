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
public class IndexController {
    @RequestMapping(value = "/")
    public String printWelcome() {
        return "index";
    }
}