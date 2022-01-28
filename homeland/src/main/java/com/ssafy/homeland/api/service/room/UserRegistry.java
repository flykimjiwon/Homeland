package com.ssafy.homeland.api.service.room;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.WebSocketSession;

/**
 * Map of users registered in the system. This class has a concurrent hash map to store users, using
 * its name as key in the map.
 *
 * @author Boni Garcia (bgarcia@gsyc.es)
 * @author Micael Gallego (micael.gallego@gmail.com)
 * @authos Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class UserRegistry {

    private final ConcurrentHashMap<String, UserSession> usersByName = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, UserSession> usersBySessionId = new ConcurrentHashMap<>();

    public void register(UserSession user) {
        System.out.println("UserRegistry.register");
        usersByName.put(user.getName(), user);
        usersBySessionId.put(user.getSession().getId(), user);
    }

    public UserSession getByName(String name) {
        System.out.println("UserRegistry.getByName");
        return usersByName.get(name);
    }

    public UserSession getBySession(WebSocketSession session) {
        System.out.println("UserRegistry.getBySession");
        return usersBySessionId.get(session.getId());
    }

    public boolean exists(String name) {
        System.out.println("UserRegistry.exists");
        return usersByName.keySet().contains(name);
    }

    public UserSession removeBySession(WebSocketSession session) {
        System.out.println("UserRegistry.removeBySession");
        final UserSession user = getBySession(session);
        usersByName.remove(user.getName());
        usersBySessionId.remove(session.getId());
        return user;
    }

}
