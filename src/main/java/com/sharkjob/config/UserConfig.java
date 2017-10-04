package com.sharkjob.config;

import com.sharkjob.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    public User user(){
        User user = new User();
        return user;
    }
}
