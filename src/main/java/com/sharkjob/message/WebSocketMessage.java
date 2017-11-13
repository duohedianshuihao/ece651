package com.sharkjob.message;



import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ListMultimap;
import com.google.common.collect.Multimaps;
import com.google.gson.Gson;
import lombok.Data;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Chino on 2017/11/4.
 * Template of WebSocket Example for message system.
 * Not finished.
 * Need requirements!
 */
@ServerEndpoint("/messageSystem/{jobId}")
public class WebSocketMessage {
    private static ListMultimap<String, Session> jobSet = Multimaps.synchronizedListMultimap(ArrayListMultimap.<String, Session> create());
    private AtomicInteger connections = new AtomicInteger(0);

    @OnOpen
    public void onOpen(@PathParam("jobId") String jobId, Session session ){
        jobSet.put(jobId,session);
        connections.addAndGet(1);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("jobId") String jobId){
        /*
            Save this msg in the DB for future development.
            Gson gson = new Gson();
            Message msg= gson.fromJson(message, Message.class);
        */

        for (Session session1: jobSet.get(jobId)) {
                session1.getAsyncRemote().sendText(message);
        }
    }

    @OnError
    public void onError(Session session, Throwable error){
    }

    @OnClose
    public void onClose(@PathParam("jobId") String jobId, Session session){
        jobSet.remove(jobId,session);
        connections.addAndGet(-1);
    }

    public Integer getChatRoomConnections(String jobId){
        return jobSet.get(jobId).size();

    }

}
