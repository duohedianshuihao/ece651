package com.sharkjob.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * Created by Chino on 2017/9/26.
 */
@Controller
public class PagesController {

    @RequestMapping(value = "/signup")
    public String getSignupPage() {
        return "signup";
    }

    @RequestMapping(value = "/login")
    public String getLoginPage() {
        return "login";
    }

    @RequestMapping(value = "/jobList")
    public String getJobListPage(){
        return "jobList";
    }

    @RequestMapping(value = "/jobInfo")
    public String getJobInfoPage(){
        return "jobInfo";
    }
}
