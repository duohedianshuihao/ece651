package com.sharkjob.config;

import com.sharkjob.Dao.JobDao;
import com.sharkjob.Dao.JobDaoInterface;
import com.sharkjob.Dao.UserDao;
import com.sharkjob.Dao.UserDaoInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

/**
 * Created by Chino on 2017/10/26.
 */
@Configuration
public class CreateDataBase {
    @Autowired
    UserDaoInterface userDao;
    @Autowired
    JobDaoInterface jobDao;
    private static final Logger log = LoggerFactory.getLogger(CreateDataBase.class);

    @PostConstruct
    public void createDB() {
        userDao.createSharkJobUserTable();
        jobDao.createSharkJobInfoTable();
        log.info("PostConstruct Method invoked");
    }
}
