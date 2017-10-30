package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.controller.IndexController;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import com.sharkjob.model.User;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

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
            log.info("Job Table has already exist.");
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

    public void addCommentInSharkJobInfoTable(String jobId, Comment comment) {
        Job job = findJobInSharkJobInfoTableThroughJobId(jobId);
        ArrayList<Comment> comments = job.getComments();
        comments.add(comment);
        job.setComments(comments);
    }

    public List<Job> getAllJobsInSharkJobInfoTable() {

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        List<Job> jobs = jobMapper.scan(Job.class, scanExpression);
        Collections.sort(jobs, new Comparator<Job>() {
            @Override
            public int compare(Job o1, Job o2) {
                if (o1.getCreatedTime().after(o2.getCreatedTime()))  return 1;
                if (o1.getCreatedTime().before(o2.getCreatedTime())) return -1;
                return 0;
            }
            });

        return jobs;
    }
}
