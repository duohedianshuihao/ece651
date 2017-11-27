package com.sharkjob.config;

import com.sharkjob.Dao.UserDao;
import com.sharkjob.message.WebSocketMessage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebSocketConfig {

    @Bean
    public WebSocketMessage webSocket() {
        WebSocketMessage webSocketMessage = new WebSocketMessage();
        return webSocketMessage;
    }
}
