package com.sharkjob.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Chino on 2017/9/14.
 */
@Controller
@RequestMapping("/")
public class HelloWorld {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model){
        model.addAttribute("message", "Hello,world");
        return "index";
    }
}