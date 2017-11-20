package com.sharkjob.message;

import javafx.beans.binding.When;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.websocket.*;

import java.io.IOException;
import java.net.URI;
import java.nio.ByteBuffer;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

import static org.mockito.Mockito.*;

import static org.junit.Assert.*;

/**
 * Created by Chino on 2017/11/20.
 */
@RunWith(MockitoJUnitRunner.class)
public class WebSocketMessageTest {
    private WebSocketMessage webSocketMessage = new WebSocketMessage();
    @Mock
    private Session session = new Session() {
        @Override
        public WebSocketContainer getContainer() {
            return null;
        }

        @Override
        public void addMessageHandler(MessageHandler messageHandler) throws IllegalStateException {

        }

        @Override
        public Set<MessageHandler> getMessageHandlers() {
            return null;
        }

        @Override
        public void removeMessageHandler(MessageHandler messageHandler) {

        }

        @Override
        public String getProtocolVersion() {
            return null;
        }

        @Override
        public String getNegotiatedSubprotocol() {
            return null;
        }

        @Override
        public List<Extension> getNegotiatedExtensions() {
            return null;
        }

        @Override
        public boolean isSecure() {
            return false;
        }

        @Override
        public boolean isOpen() {
            return false;
        }

        @Override
        public long getMaxIdleTimeout() {
            return 0;
        }

        @Override
        public void setMaxIdleTimeout(long l) {

        }

        @Override
        public void setMaxBinaryMessageBufferSize(int i) {

        }

        @Override
        public int getMaxBinaryMessageBufferSize() {
            return 0;
        }

        @Override
        public void setMaxTextMessageBufferSize(int i) {

        }

        @Override
        public int getMaxTextMessageBufferSize() {
            return 0;
        }

        @Override
        public RemoteEndpoint.Async getAsyncRemote() {
            return new RemoteEndpoint.Async() {
                @Override
                public long getSendTimeout() {
                    return 0;
                }

                @Override
                public void setSendTimeout(long l) {

                }

                @Override
                public void sendText(String s, SendHandler sendHandler) {

                }

                @Override
                public Future<Void> sendText(String s) {
                    return null;
                }

                @Override
                public Future<Void> sendBinary(ByteBuffer byteBuffer) {
                    return null;
                }

                @Override
                public void sendBinary(ByteBuffer byteBuffer, SendHandler sendHandler) {

                }

                @Override
                public Future<Void> sendObject(Object o) {
                    return null;
                }

                @Override
                public void sendObject(Object o, SendHandler sendHandler) {

                }

                @Override
                public void setBatchingAllowed(boolean b) throws IOException {

                }

                @Override
                public boolean getBatchingAllowed() {
                    return false;
                }

                @Override
                public void flushBatch() throws IOException {

                }

                @Override
                public void sendPing(ByteBuffer byteBuffer) throws IOException, IllegalArgumentException {

                }

                @Override
                public void sendPong(ByteBuffer byteBuffer) throws IOException, IllegalArgumentException {

                }
            };
        }

        @Override
        public RemoteEndpoint.Basic getBasicRemote() {
            return null;
        }

        @Override
        public String getId() {
            return null;
        }

        @Override
        public void close() throws IOException {

        }

        @Override
        public void close(CloseReason closeReason) throws IOException {

        }

        @Override
        public URI getRequestURI() {
            return null;
        }

        @Override
        public Map<String, List<String>> getRequestParameterMap() {
            return null;
        }

        @Override
        public String getQueryString() {
            return null;
        }

        @Override
        public Map<String, String> getPathParameters() {
            return null;
        }

        @Override
        public Map<String, Object> getUserProperties() {
            return null;
        }

        @Override
        public Principal getUserPrincipal() {
            return null;
        }

        @Override
        public Set<Session> getOpenSessions() {
            return null;
        }
    };
    @Before
    public void setUp(){
        when(session.getAsyncRemote()).thenReturn(new RemoteEndpoint.Async() {
            @Override
            public long getSendTimeout() {
                return 0;
            }

            @Override
            public void setSendTimeout(long l) {

            }

            @Override
            public void sendText(String s, SendHandler sendHandler) {

            }

            @Override
            public Future<Void> sendText(String s) {
                return null;
            }

            @Override
            public Future<Void> sendBinary(ByteBuffer byteBuffer) {
                return null;
            }

            @Override
            public void sendBinary(ByteBuffer byteBuffer, SendHandler sendHandler) {

            }

            @Override
            public Future<Void> sendObject(Object o) {
                return null;
            }

            @Override
            public void sendObject(Object o, SendHandler sendHandler) {

            }

            @Override
            public void setBatchingAllowed(boolean b) throws IOException {

            }

            @Override
            public boolean getBatchingAllowed() {
                return false;
            }

            @Override
            public void flushBatch() throws IOException {

            }

            @Override
            public void sendPing(ByteBuffer byteBuffer) throws IOException, IllegalArgumentException {

            }

            @Override
            public void sendPong(ByteBuffer byteBuffer) throws IOException, IllegalArgumentException {

            }
        });
    }

    @Test
    public void valid_onOpen(){
        webSocketMessage.setConnections(new AtomicInteger(0));
        webSocketMessage.onOpen("anyId", session);
        assertEquals(1, webSocketMessage.getConnections().get());
    }
    @Test
    public void valid_onClose(){
        webSocketMessage.onOpen("anyId", session);
        webSocketMessage.onClose("anyId", session);
        assertEquals(0, webSocketMessage.getConnections().get());
    }
    @Test
    public void valid_onMessage(){
        webSocketMessage.onOpen("anyId", session);
        webSocketMessage.onMessage("anyMessage","anyId");
        verify(session).getAsyncRemote();
    }
    @Test
    public void valid_onError(){
        webSocketMessage.onError(session, new Throwable());
    }
    @Test
    public void valid_connections(){
        assertEquals(new Integer(0),webSocketMessage.getChatRoomConnections("any"));
    }

}