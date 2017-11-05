package com.sharkjob.message;



import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Chino on 2017/11/4.
 * Template of WebSocket Example for message system.
 * Not finished.
 * Need requirements!
 */
@ServerEndpoint("/messageSystem/{jobId}/{userName}")
public class WebSocketMessage {
    private static Map<String, Session> userSet = new ConcurrentHashMap<>();
    private static Map<Session, String> jobSet = new ConcurrentHashMap<>();
    private AtomicInteger connections = new AtomicInteger(0);

    @OnOpen
    public void onOpen(@PathParam("userName") String name, @PathParam("jobId") String jobId, Session session ){
        userSet.put(name, session);
        jobSet.put(session,jobId);
        connections.addAndGet(1);
    }

    @OnMessage
    public void onMessage(String message, Session session){
        String jobId = jobSet.get(session);
        for (Session session1: jobSet.keySet())
        {
            if (jobId == jobSet.get(session1)){
                session1.getAsyncRemote().sendText(message);
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable error){
    }

    @OnClose
    public void onClose(@PathParam("userName") String name,@PathParam("jobId") String jobId, Session session){
        userSet.remove(name, session);
        jobSet.remove(session, jobId);
        connections.addAndGet(-1);
    }

}
