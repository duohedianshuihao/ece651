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
        return "index";
    }

    @RequestMapping(value = "/login")
    public String getLoginPage() {
        return "index";
    }

    @RequestMapping(value = "/jobInfo")
    public String getJobInfoPage(){
        return "index";
    }

    @RequestMapping(value = "/userprofile")
    public String getUserprofile(){
        return "index";
    }

    @RequestMapping(value = "/jobdetail")
    public String getDetailPage(){ return "index"; }

    @RequestMapping(value = "/postjob")
    public String getPostPage(){ return "index"; }
}
