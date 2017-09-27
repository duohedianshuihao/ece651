package com.sharkjob.model;

import org.springframework.data.redis.core.RedisTemplate;

import java.util.Map;

public class UserRepoImpl implements UserRepo {

    private RedisTemplate<String, User> redisTemplate;

    private static String USER_KEY = "User";

    public RedisTemplate<String, User> getRedisTemplate()
    {
        return redisTemplate;
    }

    public void setRedisTemplate(RedisTemplate<String, User> redisTemplate)
    {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void save(User user) {

        this.redisTemplate.opsForHash().put(USER_KEY, user.getEmail(), user);

    }

    @Override
    public User find(String email) {

        return (User)this.redisTemplate.opsForHash().get(USER_KEY, email);

    }

    @Override
    public Map<Object, Object> findAll() {

        return this.redisTemplate.opsForHash().entries(USER_KEY);

    }

    @Override
    public void delete(String email) {

        this.redisTemplate.opsForHash().delete(USER_KEY, email);

    }
}
