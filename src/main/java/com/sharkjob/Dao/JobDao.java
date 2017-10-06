package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.controller.IndexController;
import com.sharkjob.model.Job;
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

    private static final Logger log = LoggerFactory.getLogger(IndexController.class); // need a jobController

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

    public void deleteJobInSharkJobInfoTable(String ID){
        jobMapper.delete(findJobInSharkJobInfoTableThroughID(ID));
    }

    public Job findJobInSharkJobInfoTableThroughID (String ID){
        Job job = jobMapper.load(Job.class, ID);
        if (job != null) {
            log.info(job.toString());
        }
        return job;
    }

    //edit for the job info
}
