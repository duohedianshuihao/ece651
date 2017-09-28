package com.sharkjob.model;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Redis {

    //private UserRepoImpl userRepo = new UserRepoImpl();

    public static void main(String[] args) {

        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(10);
        JedisPool pool = new JedisPool(jedisPoolConfig, "localhost", 6379);

        Jedis jedis = null;
        try{
            jedis = pool.getResource();
            User user = new User();
            user.setName("abc");
            user.setEmail("abc@abc.ca");
            user.setPassword("abc");
            user.setSkill("abc");
            user.setType("abc");

//            userRepo.addUser(user);
//            System.out.println(userRepo.getUser("abc@abc.ca"));

            byte[] byteArray = serialize(user);

            jedis.set(user.getName().getBytes(), byteArray);

            byteArray = jedis.get(user.getName().getBytes());

            user = deserialize(byteArray);

            System.out.println(user);

        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if(jedis != null){
                jedis.close();
            }
        }

        pool.close();


        //Connecting to Redis server on localhost
//        Jedis jedis = null;
//        try{
//            jedis = JedisPoolManager.getMgr().getResource();
//        }
//        System.out.println("Connection to server sucessfully");
//        //check whether server is running or not
//        System.out.println("Server is running: "+jedis.ping());
    }

    public static User deserialize(byte[] byteArray) throws ClassNotFoundException, IOException {
        ObjectInputStream ois = null;
        try {
            ByteArrayInputStream bais = new ByteArrayInputStream(byteArray);
            ois = new ObjectInputStream(bais);
            return (User) ois.readObject();
        } finally {
            ois.close();
        }
    }

    public static byte[] serialize(User user) throws IOException{
        ByteArrayOutputStream baos = null;
        ObjectOutputStream oos = null;
        try {
            baos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(baos);
            oos.writeObject(user);
            oos.flush();

            return baos.toByteArray();

        } finally {
            oos.close();
            baos.close();
        }
    }
}