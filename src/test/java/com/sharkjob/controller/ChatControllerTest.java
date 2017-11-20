package com.sharkjob.controller;

import com.sharkjob.message.WebSocketMessage;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.*;
import static org.mockito.Matchers.anyString;

/**
 * Created by Chino on 2017/11/20.
 */
@RunWith(MockitoJUnitRunner.class)
public class ChatControllerTest {

    public WebSocketMessage webSocketMessage = new WebSocketMessage();
    public ChatController chatController = new ChatController();

    @Before
    public void setUp(){
        chatController.setWebSocketMessage(webSocketMessage);
    }

    @Test
    public void getChatRoomInfo() {
       assertEquals(new ResponseEntity<>(new Integer(0), HttpStatus.OK),chatController.getChatRoomInfo(""));
    }

}