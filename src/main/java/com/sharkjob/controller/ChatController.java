package com.sharkjob.controller;

import com.sharkjob.message.WebSocketMessage;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class ChatController {

    @Autowired
    @Setter
    private WebSocketMessage webSocketMessage;

    @RequestMapping(value = "/chat/{jobId}", method = GET)
    public ResponseEntity< Integer > getChatRoomInfo(@PathVariable String jobId) {

            Integer num = webSocketMessage.getChatRoomConnections(jobId);
            return new ResponseEntity<>(num, HttpStatus.OK);
    }
}
