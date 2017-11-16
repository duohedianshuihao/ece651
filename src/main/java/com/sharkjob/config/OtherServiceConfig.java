package com.sharkjob.config;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.OtherService.Encoder;
import com.sharkjob.OtherService.MailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Chino on 2017/11/14.
 */
@Configuration
public class OtherServiceConfig {
    @Bean
    public MailService mailService(){
        MailService mailService = new MailService();
        return mailService;
    }
}
