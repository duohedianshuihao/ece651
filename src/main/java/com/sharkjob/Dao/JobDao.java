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
import lombok.val;
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
            log.info("Number of jobs in talbe:"+getNumberOfJobsInSharkJobInfoTable());
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
//            log.info(job.toString());
        }
        return job;
    }

    public boolean updateJobInSharkJobInfoTable(Job job) {
        if( job.getJobId() == null || jobMapper.load(Job.class, job.getJobId()) == null ) { return false;}
        String jobId = job.getJobId();
        String newDescription = job.getJobDescription();
        String newTittle = job.getJobTittle();
        String newLocation = job.getLocation();
        Date newStartTime = job.getStartTime();
        Date newExpireTime = job.getExpirTime();
        List<String> newRequiredSkills = job.getRequiredSkills();
        Job oldJob = jobMapper.load(Job.class, jobId);
        jobMapper.delete(oldJob);
        oldJob.setJobDescription(newDescription);
        oldJob.setJobTittle(newTittle);
        oldJob.setLocation(newLocation);
        oldJob.setStartTime(newStartTime);
        oldJob.setExpirTime(newExpireTime);
        oldJob.setRequiredSkills(newRequiredSkills);
        jobMapper.save(oldJob);
        return true;
    }

    public void addCommentInSharkJobInfoTable(String jobId, Comment comment) {
        Job job = findJobInSharkJobInfoTableThroughJobId(jobId);
        if(job.getComments() == null)  {
            ArrayList<Comment> comments = new ArrayList<>();
            comments.add(comment);
            job.setComments(comments);
        } else {
            ArrayList<Comment> comments = job.getComments();
            comments.add(comment);
            job.setComments(comments);
        }
        jobMapper.save(job);
    }

    public List<Job> getAllJobsInSharkJobInfoTable() {

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        List<Job> jobs = new ArrayList<>();
        List<Job> jobsInDynamoDB = jobMapper.scan(Job.class, scanExpression);
        for(val entity: jobsInDynamoDB){
            jobs.add(entity);
        }
        Collections.sort(jobs, new Comparator<Job>(){
            @Override
            public int compare(Job o1, Job o2) {
                if (o1.getCreatedTime().after(o2.getCreatedTime()))  return -1;
                if (o1.getCreatedTime().before(o2.getCreatedTime())) return 1;
                return 0;
            }
            });
        return jobs;
    }

    public int getNumberOfJobsInSharkJobInfoTable() {

        return jobMapper.count(Job.class, new DynamoDBScanExpression());
    }
}
