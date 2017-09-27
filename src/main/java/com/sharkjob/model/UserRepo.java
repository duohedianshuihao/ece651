package com.sharkjob.model;

import java.util.Map;

public interface UserRepo {

    void save(User user);

    User find(String email);

    Map<Object, Object> findAll();

    void delete(String email);
}
