package com.sharkjob.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created by Chino on 2017/9/14.
 */
@Controller
@RequestMapping("/")
public class IndexController {
    private static final Logger log = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model){
        model.addAttribute("message", "Hello,world");
        log.info("helloworld added");
        return "index";
    }
}