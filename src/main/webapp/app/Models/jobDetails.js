"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobDetails = (function () {
    function JobDetails(jobID, jobTitle, jobDescription, company, requiredSkills, createdTime, startTime, expirTime, location, categories, comments) {
        this.jobID = jobID;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.company = company;
        this.requiredSkills = requiredSkills;
        this.createdTime = createdTime;
        this.startTime = startTime;
        this.expirTime = expirTime;
        this.location = location;
        this.categories = categories;
        this.comments = comments;
    }
    return JobDetails;
}());
exports.JobDetails = JobDetails;
//# sourceMappingURL=jobDetails.js.map