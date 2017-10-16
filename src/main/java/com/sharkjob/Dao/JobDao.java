package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.controller.IndexController;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class JobDao {
    @Autowired
    private AmazonDynamoDB dynamoDBClient;

    @Autowired
    private DynamoDBMapper jobMapper;

    private static final Logger log = LoggerFactory.getLogger(JobDao.class); // need a jobController

    public void createSharkJobInfoTable(){
        try {
            CreateTableRequest req = jobMapper.generateCreateTableRequest(Job.class);
            // Table provision throughput is still required since it cannot be specified in your POJO
            req.setProvisionedThroughput(new ProvisionedThroughput(5L, 5L));
            // Fire off the CreateTableRequest using the low-level client
            dynamoDBClient.createTable(req);
        } catch (ResourceInUseException e) {
            //swallow
            log.info("Table has already exist.");
        }
    }

    public void saveJobInSharkJobInfoTable(Job job) {
        jobMapper.save(job);
    }

    public void deleteJobInSharkJobInfoTable(String jobId) {
        jobMapper.delete(findJobInSharkJobInfoTableThroughJobId(jobId));
    }

    public Job findJobInSharkJobInfoTableThroughJobId(String jobId) {
        Job job = jobMapper.load(Job.class, jobId);
        if (job != null) {
            log.info(job.toString());
        }
        return job;
    }

    public void updateJobInSharkJobInfoTable(String jobId, String jobDescription) {
        Job job = findJobInSharkJobInfoTableThroughJobId(jobId);
        job.setJobDescription(jobDescription);
        jobMapper.save(job);
    }
}
