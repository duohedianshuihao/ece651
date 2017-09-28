package com.sharkjob.model;

import java.util.Map;

public interface UserRepo {

    void addUser(User user);

    User getUser(String email);

//    Map<Object, Object> findAll();

    void delUser(String email);
}
