package com.sharkjob.Dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.sharkjob.model.Comment;
import com.sharkjob.model.Job;
import lombok.val;

import java.util.*;

/**
 * Created by Chino on 2017/11/27.
 */
public interface JobDaoInterface {

    public void createSharkJobInfoTable();

    public void saveJobInSharkJobInfoTable(Job job);

    public void deleteJobInSharkJobInfoTable(String jobId);

    public Job findJobInSharkJobInfoTableThroughJobId(String jobId);

    public boolean updateJobInSharkJobInfoTable(Job job);

    public void addCommentInSharkJobInfoTable(String jobId, Comment comment);

    public List<Job> getAllJobsInSharkJobInfoTable();

    public int getNumberOfJobsInSharkJobInfoTable();
}
