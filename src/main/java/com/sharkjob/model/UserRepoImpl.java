package com.sharkjob.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class UserRepoImpl implements UserRepo {

    private RedisTemplate<String,User> redisTemplate;

    private static String USER_KEY = "User";

    public RedisTemplate<String, User> getRedisTemplate()
    {
        return redisTemplate;
    }

    @Autowired
    @Qualifier("redisTemplate")
    public void setRedisTemplate(RedisTemplate<String, User> redisTemplate)
    {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void addUser(User user) {

        this.redisTemplate.opsForHash().put(USER_KEY, user.getEmail(), user);

    }

    @Override
    public User getUser(String email) {

        return (User)this.redisTemplate.opsForHash().get(USER_KEY, email);

    }


//    public Map<Object, Object> findAll() {
//
//        return this.redisTemplate.opsForHash().entries(USER_KEY);
//
//    }

    @Override
    public void delUser(String email) {

        this.redisTemplate.opsForHash().delete(USER_KEY, email);

    }
}
